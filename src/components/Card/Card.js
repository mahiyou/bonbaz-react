import { Card, Col, Row } from "react-bootstrap";
import './card.scss'

function CardContent({ title, cost, currency, icon, trend }) {
    let trendDiv;
    let trendImg;
    if (trend == "up") {
        trendDiv = <div className="up-trend" />;
        trendImg = <img
            className="cardImage"
            src="/imgs/up-diagram.svg"
            alt="React Bootstrap"
        />
    } else if (trend == "down") {
        trendDiv = <div className="down-trend" />;
        trendImg = <img
            className="cardImage mt-1"
            src="/imgs/down-diagram.svg"
            alt="React Bootstrap"
        />
    }else{
        trendImg = <img
            className="cardImage mt-2"
            src="/imgs/fixed-diagram.svg"
            alt="React Bootstrap"
        />
    }
    return (
        <Card className="card">
            <Card.Body>
                <Row>
                    <Col xs={2}>
                        <img
                            className="mb-3 ms-3"
                            src={icon}
                            width="19"
                            alt="React Bootstrap logo"
                        />
                    </Col>
                    <Col xs={10}>
                        <Card.Title>
                            {title}
                            {trendDiv}
                        </Card.Title>
                        <Card.Subtitle>{cost.toLocaleString()} <span>{currency}</span></Card.Subtitle>
                    </Col>
                    {trendImg}
                </Row>
            </Card.Body>
        </Card>
    )
}
export default CardContent;