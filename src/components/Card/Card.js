import { Card, Col, Row } from "react-bootstrap";
import './card.scss'

function CardContent({ currency,targetCurrency,icon }) {
    let trendDiv;
    let trendImg;
    let localIcon;
    trendDiv = <div className="up-trend" />;
    trendImg = <img
        className="cardImage"
        src="/imgs/up-diagram.svg"
        alt="React Bootstrap"
    />
    if(currency.icon){
        localIcon = currency.icon;
    }else{
        localIcon = icon;
    }
    // if (trend == "up") {
    //     trendDiv = <div className="up-trend" />;
    //     trendImg = <img
    //         className="cardImage"
    //         src="/imgs/up-diagram.svg"
    //         alt="React Bootstrap"
    //     />
    // } else if (trend == "down") {
    //     trendDiv = <div className="down-trend" />;
    //     trendImg = <img
    //         className="cardImage mt-1"
    //         src="/imgs/down-diagram.svg"
    //         alt="React Bootstrap"
    //     />
    // }else{
    //     trendImg = <img
    //         className="cardImage mt-2"
    //         src="/imgs/fixed-diagram.svg"
    //         alt="React Bootstrap"
    //     />
    // }
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
                    {trendImg}
                </Row>
            </Card.Body>
        </Card>
        </div>
    )
}
export default CardContent;