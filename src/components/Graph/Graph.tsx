import { Button, Col, Container, Row, Table, Alert } from 'react-bootstrap'
import DateRangePicker from '../DateRangePicker/DateRangePicker'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from "react";
import { DateObject } from "react-multi-date-picker";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import persian from "react-date-object/calendars/persian"
import gregorian from "react-date-object/calendars/gregorian"
import persian_en from "react-date-object/locales/persian_en"
import { IPriceHistory, ICurrency } from "../../interfaces.ts"
import { Payload, ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';
import './graph.scss';

type Props = {
    x: number,
    y: number,
    calendarType: string,
    dateFormat: boolean[],
    payload?: Payload<ValueType, NameType>
}
function CustomizedTick({ x, y, payload, calendarType, dateFormat }: Props) {
    const date = new DateObject({
        calendar: gregorian,
        format: 'YYYY-MM-DD hh:mm:ss',
        date: payload!.value!.toString(),
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

type CusProps = {
    calendarType: string,
    active: boolean,
    label: string,
    payload?: Payload<ValueType, NameType>[]
}

function CustomTooltip({ payload, label, active, calendarType }: CusProps) {
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
                <div className="label text-customGreen">Sell : {payload![0].value}</div>
                <div className="label text-customRed">Buy : {payload![1].value}</div>
            </div>
        );
    }

    return null;
}

async function APICall(url: string, parameters: undefined | { fromDate: string, toDate: string }) {
    const res = await fetch(url + (parameters ? "?" + (new URLSearchParams(parameters)) : ""));
    return res.json();
}

async function fetchChartData(fromDate: string, toDate: string) {
    return APICall("/mocks/currencyGraph.json", { fromDate, toDate });
}
async function fetchCurrencyPickerData() {
    return APICall("/mocks/currencies.json", undefined);
}


function getAverage(prices: IPriceHistory[], type: string) {
    return prices
        .map((p) => parseInt(type == 'sell' ? p.price_sell : p.price_buy))
        .reduce((p, c) => p + c, 0) / prices.length || 0;
}

function getMax(prices: IPriceHistory[], type: string) {
    return Math.max(...prices.map((p) => parseInt(type == 'sell' ? p.price_sell : p.price_buy)), 0);
}

function getMin(prices: IPriceHistory[], type: string) {
    return Math.min(...prices.map((p) => parseInt(type == 'sell' ? p.price_sell : p.price_buy)), Infinity);
}

export default function Graph() {
    const [serverError, setServerError] = useState(false);
    const [currencyPrices, setCurrencyPrices] = useState([]);
    const [currencies, setCurrencies] = useState<ICurrency[]>([]);
    const [calendarType, setCalendarType] = useState('Gregorian');
    const [dateFormat, setDateFormat] = useState([false, false]);
    const [chartTitle, setChartTitle] = useState<{ code: string, name: string }>({ code: 'aed', name: 'UAE Dirham' });
    const formatter = (value: number) => value.toLocaleString();

    async function getDataFromServer(currency: { code: string, name: string }, calendar: string, fromDate: string, toDate: string) {
        setChartTitle(currency);
        setCalendarType(calendar);
        try {
            const result = await fetchChartData(fromDate, toDate);
            setCurrencyPrices(result);
            dataProcessing(result)
        } catch {
            // setServerError(true);
        }
    }
    async function getCurrencies() {
        try {
            const result = await fetchCurrencyPickerData();
            setCurrencies(result.currencies);

        } catch {
            setServerError(true);
        }
    }
    function dataProcessing(currencyPrices: IPriceHistory[]) {
        for (let i = 0; i < currencyPrices.length; i++) {
            if (new DateObject({ date: currencyPrices[i].updated_at }).month.number != new DateObject({ date: currencyPrices[i + 1].updated_at }).month.number) {
                setDateFormat([true, false])
            }
            if (new DateObject({ date: currencyPrices[i].updated_at }).year != new DateObject({ date: currencyPrices[i + 1].updated_at }).year) {
                setDateFormat([true, true])
            }
        }
    }

    useEffect(() => {
        const now = new DateObject().format();
        getDataFromServer(chartTitle, calendarType, now, now);
        getCurrencies();
    }, []);

    const minSell = getMin(currencyPrices, "sell");
    const minBuy = getMin(currencyPrices, "buy");
    const maxSell = getMax(currencyPrices, "sell");
    const maxBuy = getMax(currencyPrices, "buy");
    const min = Math.min(minSell, minBuy);
    const max = Math.max(maxSell, maxBuy);
    return (
        <Container className='graph'>
            <Row>
                <Col lg={5} md={8} xs={12}>
                    <DateRangePicker onChange={getDataFromServer} currencies={currencies} />
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
                                        <XAxis interval={8} dataKey="updated_at" tick={<CustomizedTick calendarType={calendarType} dateFormat={dateFormat} x={0} y={0} />} />
                                        <YAxis tickFormatter={formatter} tickCount={7} tick={{ fill: "white" }} domain={[min, max]} />
                                        <Tooltip content={<CustomTooltip calendarType={calendarType} active={false} label={''} />} />
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
                {serverError && <Alert className="mt-3 bg-customRed white  text-center">
                    Server Error
                </Alert>}
            </Row>
        </Container>
    )
}