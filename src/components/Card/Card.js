import { Card, Col, Row } from "react-bootstrap";
import { AreaChart, Area, linearGradient, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './card.scss'

function CardContent({ currency, targetCurrency, icon }) {
    let trendDiv;
    let localIcon;
    let chartColor = "white";

    if (currency.icon) {
        localIcon = currency.icon;
    } else {
        localIcon = icon;
    }
    
    const id = Math.random().toString(32).substring(2);

    if (parseInt(currency.price) > parseInt(currency.history[currency.history.length - 1].price_buy)) {
        trendDiv = <div className="up-trend" />;
        chartColor = "#F55D6F";
    } else if (parseInt(currency.price) < parseInt(currency.history[currency.history.length - 1].price_buy)) {
        trendDiv = <div className="down-trend" />;
        chartColor = "#21DBA6";
    }

    return (
        <div className="d-inline px-3 px-md-1">
            <Card className="card">
                <Card.Body>
                    <Row>
                        <Col xs={2}>
                            <img
                                className="mb-3 ms-2"
                                src={localIcon}
                                width="20"
                                alt="React Bootstrap logo"
                            />
                        </Col>
                        <Col xs={10} className="text-start">
                            <Card.Title>
                                {currency.name} {currency.code && `/ ${currency.code}`}
                                {trendDiv}
                            </Card.Title>
                            <Card.Subtitle>{Number(currency.price).toLocaleString()} <span className="currency-color">{targetCurrency}</span></Card.Subtitle>
                        </Col>
                        <AreaChart
                            opacity={0.3}
                            width={171}
                            height={70}
                            data={currency.history}
                            margin={{
                                top: 3,
                                right: 0,
                                left: -60,
                                bottom: 0,
                            }}>

                            <defs>
                                <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={chartColor} stopOpacity={0.8} />
                                    <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <Area type="monotone" dataKey="price_buy" stroke={chartColor} fill={"url(#"+id+")"} />
                            <YAxis type="number" tick={false} axisLine={false} domain={['dataMin', 'dataMax']} />
                        </AreaChart>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    )
}
export default CardContent;