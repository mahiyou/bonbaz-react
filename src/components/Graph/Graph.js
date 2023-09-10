import { Button, Col, Container, Row, Table } from 'react-bootstrap'
import DateRangePicker from '../DateRangePicker/DateRangePicker'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from "react";
import { DateObject } from "react-multi-date-picker";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import persian from "react-date-object/calendars/persian"
import gregorian from "react-date-object/calendars/gregorian"
import persian_en from "react-date-object/locales/persian_en"
import './graph.scss';

function CustomizedTick(props) {
    const { x, y, stroke, payload, calendarType, dateFormat } = props;
    const date = new DateObject({
        calendar: gregorian,
        format: 'YYYY-MM-DD hh:mm:ss',
        date: payload.value,
    });
    if (calendarType == "Jalali") {
        date.convert(persian, persian_en)
    }
    return (
        <g transform={`translate(${x},${y})`}>
            <text x={0} y={5} dy={12} fill="white">
                <tspan textAnchor="middle" x="0">
                    {date.format('DD')}
                </tspan>
                {(dateFormat[0] && !dateFormat[1]) && <tspan textAnchor="middle" x="0" dy="16">
                    {date.format('MMM')}
                </tspan>}
                {dateFormat[1] && <tspan textAnchor="middle" x="0" dy="16">
                    {date.format('MMM.YY')}
                </tspan>}
            </text>
        </g>
    );
}

function CustomTooltip({ payload, label, active, calendarType }) {
    if (active) {
        const date = new DateObject({
            calendar: gregorian,
            format: 'YYYY-MM-DD hh:mm:ss',
            date: label,
        });
        if (calendarType == "Jalali") {
            date.convert(persian, persian_en)
        }
        return (
            <div className="custom-tooltip bg-secondary p-2">
                <div className="label">{date.format('YYYY-MM-DD hh:mm')}</div>
                <div className="label text-customGreen">Sell : {payload[0].value}</div>
                <div className="label text-customRed">Buy : {payload[1].value}</div>
            </div>
        );
    }

    return null;
}
/**
 * 
 * @param {string} url
 * @param {Record<string,string>} parameters
 * @returns {any}
 */
async function APICall(url, parameters) {
    const res = await fetch(url + (parameters ? "?" + (new URLSearchParams(parameters)).toString() : ""));
    return res.json();
}

/**
 * 
 * @param {DateObject|string} fromDate 
 * @param {DateObject|string} toDate 
 * @returns {Promise<any>}
 */
async function fetchChartData(fromDate, toDate) {
    return APICall("/mocks/currencyGraph.json", { fromDate, toDate });
}
async function fetchCurrencyPickerData() {
    return APICall("/mocks/currencies.json");
}

/**
 * @param {Array<{price_sell:string,price_buy:string}>} prices
 * @param {"sell"|"buy"} type 
 * @returns {number}
 */
function getAverage(prices, type) {
    return prices
        .map((p) => parseInt(type == 'sell' ? p.price_sell : p.price_buy))
        .reduce((p, c) => p + c, 0) / prices.length || 0;
}
/**
 * @param {Array<{price_sell:string,price_buy:string}>} prices
 * @param {"sell"|"buy"} type 
 * @returns {number}
 */
function getMax(prices, type) {
    return Math.max(...prices.map((p) => parseInt(type == 'sell' ? p.price_sell : p.price_buy)), 0);
}
/**
 * @param {Array<{price_sell:string,price_buy:string}>} prices
 * @param {"sell"|"buy"} type 
 * @returns {number}
 */
function getMin(prices, type) {
    return Math.min(...prices.map((p) => parseInt(type == 'sell' ? p.price_sell : p.price_buy)), Infinity);
}

export default function Graph() {
    const [serverError, setServerError] = useState(false);
    const [currencyPrices, setCurrencyPrices] = useState([]);
    const [currencies, setCurrencies] = useState([]);
    const [calendarType, setCalendarType] = useState('Gregorian');
    const [dateFormat, setDateFormat] = useState([false, false]);
    const [chartTitle, setChartTitle] = useState({ code: 'aed', name: 'UAE Dirham' });
    const formatter = (value) => value.toLocaleString();


    /**
     * @param {{code:string,name:string}} currency 
     * @param {string} calendar 
     * @param {DateObject} fromDate 
     * @param {DateObject} toDate 
     */
    async function getDataFromServer(currency, calendar, fromDate, toDate) {
        setChartTitle(currency);
        setCalendarType(calendar);
        try {
            const result = await fetchChartData(fromDate, toDate);
            setCurrencyPrices(result);
            dataProcessing(result)
        } catch {
            setServerError(true);
        }
    }
    async function getCurrencies(){
        try{
            const result = await fetchCurrencyPickerData();
            setCurrencies(result.currencies);

        } catch {
            setServerError(true);
        }
    }
    function dataProcessing(currencyPrices) {
        for (let i = 0; i < currencyPrices.length; i++) {
            if (new DateObject({ date: currencyPrices[i].updated_at}).month.number != new DateObject({ date: currencyPrices[i + 1].updated_at}).month.number) {
                setDateFormat([true,false])
            }
            if (new DateObject({ date: currencyPrices[i].updated_at}).year != new DateObject({ date: currencyPrices[i + 1].updated_at}).year) {
                setDateFormat([true,true])
            }
        }
    }

    useEffect(() => {
        const now = new DateObject();
        getDataFromServer(chartTitle, calendarType, now, now);
        getCurrencies();
    }, []);

    const minSell = getMin(currencyPrices, "sell");
    const minBuy = getMin(currencyPrices, "buy");
    const maxSell = getMax(currencyPrices, "sell");
    const maxBuy = getMax(currencyPrices, "buy");
    const min = Math.min(minBuy, minBuy);
    const max = Math.max(maxSell, maxBuy);
    return (
        <Container className='graph'>
            <Row>
                <Col lg={5} md={8} xs={12}>
                    <DateRangePicker onChange={getDataFromServer} currencies={currencies}/>
                </Col>
            </Row>
            <Row className='mt-5 mb-5'>
                <Col lg={8} xs={12}>
                    <div>
                        <div className='mb-2'>
                            <span className={`me-2 rounded-1 fi fi-${chartTitle.code.slice(0, 2)}`}></span>
                            <span>({chartTitle.code.toUpperCase()}/IRR) {chartTitle.name} to Rial Chart</span>
                        </div>
                        <div className='bg-primary graph-background pt-5 pb-5 mb-5'>
                            {(currencyPrices.length &&
                                <ResponsiveContainer>
                                    <LineChart
                                        width={700}
                                        height={400}
                                        data={currencyPrices}
                                        margin={{
                                            top: 5,
                                            right: 30,
                                            left: 20,
                                            bottom: 5,
                                        }}>
                                        <CartesianGrid opacity={0.2} />
                                        <XAxis interval={8} dataKey="updated_at" tick={<CustomizedTick calendarType={calendarType} dateFormat={dateFormat} />} />
                                        <YAxis tickFormatter={formatter} tickCount={7} tick={{ fill: "white" }} domain={[min, max]} />
                                        <Tooltip content={<CustomTooltip calendarType={calendarType} />} />
                                        <Legend wrapperStyle={{ bottom: -28 }} />
                                        <Line type="monotone" name='Sell' dataKey="price_sell" stroke="#21DBA6" strokeWidth={2} dot={false} />
                                        <Line type="monotone" name='Buy' dataKey="price_buy" stroke="#F55D6F" strokeWidth={2} dot={false} />
                                    </LineChart>
                                </ResponsiveContainer>

                            )}
                        </div>
                    </div>

                </Col>
                <Col lg={4} xs={12}>
                    <Table responsive className="table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Sell</th>
                                <th>Buy</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th className='text-white'>Average</th>
                                <th className='text-white'>{getAverage(currencyPrices, 'sell')}</th>
                                <th className='text-white'>{getAverage(currencyPrices, 'buy')}</th>
                            </tr>
                            <tr>
                                <th className='text-white'>MAX</th>
                                <th className='text-white'>{maxSell}</th>
                                <th className='text-white'>{maxBuy}</th>
                            </tr>
                            <tr>
                                <th className='text-white'>MIN</th>
                                <th className='text-white'>{minSell}</th>
                                <th className='text-white'>{minBuy}</th>
                            </tr>
                        </tbody>
                    </Table>
                    <div className='text-customGreen mb-5'>*All prices are in Iranian Toman*</div>
                    <div>Click below to get the data as an Excel file:</div>
                    <Button className='mt-3 dln-btn' color='white'><FontAwesomeIcon className='me-2' icon={faDownload} />Export</Button>
                </Col>
            </Row>
        </Container>
    )
}