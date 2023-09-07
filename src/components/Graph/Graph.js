import { Button, Col, Container, Row, Table } from 'react-bootstrap'
import DateRangePicker from '../DateRangePicker/DateRangePicker'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from "react";
import { DateObject } from "react-multi-date-picker";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './graph.scss'
export default function Graph() {
    const [serverError, setServerError] = useState(false);
    const [currencyPrices, setCurrencyPrices] = useState(false);
    const [chartTitle, setChartTitle] = useState(['afn', 'Afghan Afg']);
    const [todayDate, setTodayDate] = useState(new DateObject())
    const formatter = (value) => value.toLocaleString();

    useEffect(() => {
        async function fetchData() {
            try {
                // const res = await fetch(`/mocks/currencyGraph.json?fromDate="${todayDate}"&toDate="${todayDate}"`);
                const res = await fetch('/mocks/currencyGraph.json');
                const data = await res.json()
                setCurrencyPrices(data);
            }
            catch (e) {
                setServerError(true);
            }
        }
        fetchData();
    }, [])

    async function getDataFromServer(currency, date, targetDate) {
        setChartTitle([currency.code, currency.name])
        try {
            const res = await fetch('/mocks/currencyGraph.json');
            // const res = await fetch(`/mocks/currencyGraph.json?currency=${currency.code}&fromDate="${date}"&toDate="${targetDate}"`);
            const data = await res.json()
            setCurrencyPrices(data);
        }
        catch (e) {
            setServerError(true);
        }
    }
    function CustomTooltip({ payload, label, active }) {
        if (active) {
            return (
                <div className="custom-tooltip bg-secondary p-2">
                    <div className="label">{label.substring(0,16)}</div>
                    <div className="label text-customGreen">{`Sell : ${payload[0].value}`}</div>
                    <div className="label text-customRed">{`Buy : ${payload[1].value}`}</div>
                </div>
            );
        }

        return null;
    }
    function CustomizedTick(props) {
        const { x, y, stroke, payload } = props;
        return (
            <g transform={`translate(${x},${y})`}>
                <text x={0} y={5} dy={16} fill="white">
                    <tspan textAnchor="middle" x="0">
                        {payload.value.substring(0, 10)}
                    </tspan>
                    <tspan textAnchor="middle" x="0" dy="20">
                        {payload.value.substring(12,16)}
                    </tspan>
                </text>
            </g>
        );
    }
    function getAverage(type) {

        let allPrices = 0;

        if (type == 'sell') {
            for (let i = 0; i < currencyPrices.length; i++) {
                allPrices = allPrices + parseInt(currencyPrices[i].price_sell)
            }
        }
        if (type == 'buy') {
            for (let i = 0; i < currencyPrices.length; i++) {
                allPrices = allPrices + parseInt(currencyPrices[i].price_buy)
            }
        }

        if (currencyPrices) {
            return allPrices / currencyPrices.length;
        } else {
            return 0;
        }
    }
    function getMax(type) {
        const priceArray = [];
        if (type == 'sell') {
            for (let i = 0; i < currencyPrices.length; i++) {
                priceArray.push(currencyPrices[i].price_sell)
            }
        }
        if (type == 'buy') {
            for (let i = 0; i < currencyPrices.length; i++) {
                priceArray.push(currencyPrices[i].price_buy)
            }
        }
        if (priceArray.length > 0) {
            return Math.max(...priceArray);
        } else {
            return 0;
        }
    }
    function getMin(type) {
        const priceArray = [];
        if (type == 'sell') {
            for (let i = 0; i < currencyPrices.length; i++) {
                priceArray.push(currencyPrices[i].price_sell)
            }
        }
        if (type == 'buy') {
            for (let i = 0; i < currencyPrices.length; i++) {
                priceArray.push(currencyPrices[i].price_buy)
            }
        }
        if (priceArray.length > 0) {
            return Math.min(...priceArray);
        } else {
            return 0;
        }
    }

    return (
        <Container className='graph'>
            <Row>
                <Col lg={5} md={8} xs={12}>
                    <DateRangePicker getDataFromServer={getDataFromServer} />
                </Col>
            </Row>
            <Row className='mt-5 mb-5'>
                <Col lg={8} xs={12}>
                    <div>
                        <div className='mb-2'>
                            <span className={`me-2 rounded-1 fi fi-${chartTitle[0].slice(0, 2)}`}></span>
                            <span>({chartTitle[0].toUpperCase()}/IRR) {chartTitle[1]} to Rial Chart</span>
                        </div>
                        <div className='bg-primary pt-5 pb-5'>
                            <LineChart
                                width={700}
                                height={400}
                                data={currencyPrices}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid opacity={0.2} />
                                <XAxis interval={8} dataKey="updated_at" tick={<CustomizedTick />} />
                                <YAxis tickFormatter={formatter} tickCount={7} tick={{ fill: "white" }} domain={[Math.min(getMin('sell'), getMin('buy')), Math.max(getMax('buy'), getMax('sell'))]} />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend wrapperStyle={{ bottom: -28 }} />
                                <Line type="monotone" name='Sell' dataKey="price_sell" stroke="#21DBA6" strokeWidth={2} dot={false} />
                                <Line type="monotone" name='Buy' dataKey="price_buy" stroke="#F55D6F" strokeWidth={2} dot={false} />
                            </LineChart>
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
                                <th className='text-white'>{getAverage('sell')}</th>
                                <th className='text-white'>{getAverage('buy')}</th>
                            </tr>
                            <tr>
                                <th className='text-white'>MAX</th>
                                <th className='text-white'>{getMax('sell')}</th>
                                <th className='text-white'>{getMax('buy')}</th>
                            </tr>
                            <tr>
                                <th className='text-white'>MIN</th>
                                <th className='text-white'>{getMin('sell')}</th>
                                <th className='text-white'>{getMin('buy')}</th>
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