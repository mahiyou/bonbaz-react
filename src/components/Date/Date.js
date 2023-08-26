import './date.scss';
import persian from "react-date-object/calendars/persian";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { DateObject } from 'react-multi-date-picker';



export default function Date() {
    const date = new DateObject();
    const datePersian = new DateObject({ calendar: persian })
    return (
        <div className="bg-secondary my-4 p-3 rounded date">
            <Row>
                <Col xs={12} lg={7}>
                    <img
                        className='d-inline mb-1'
                        src="/imgs/dot-in-date.svg"
                        width="22"
                        alt="React Bootstrap logo"
                    />
                    <p className="sentence my-0 d-inline">Live price of gold, coin, dollars and Iranian currencies <span className="sub-sentence">*All prices are in Iranian Toman*</span></p>
                </Col>
                <Col xs={12} lg={5}>
                    <div className='date-content'>
                        <img
                            className='d-inline'
                            src="/imgs/flag-of-iran.svg"
                            width="22"
                            alt="React Bootstrap logo"
                        />
                        <span className='ms-2 mb-3'>{date.format("dddd", ["Date"])}</span>
                        <span className='ms-2'>{datePersian.format()}</span>
                        <span className='ms-2 text-customRed persianDate'>{date.format("DD MMMM YYYY", ["Date"])}</span>
                        <span className='ms-2'>{date.format("HH : mm : ss", ["Time"])}</span>
                    </div>
                </Col>
            </Row>
        </div>
    )
}