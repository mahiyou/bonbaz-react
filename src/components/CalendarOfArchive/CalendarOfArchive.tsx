import { Calendar } from "react-multi-date-picker"
import { useState } from "react";
import persian from "react-date-object/calendars/persian"
import persian_en from "react-date-object/locales/persian_en"
import { DateObject } from "react-multi-date-picker";
import { Form, Row, Col, Button } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import "./calendarOfArchive.scss"

type Prop = {
    getDataOfThisDate: (arg0: string) => void
};

export default function CalendarOffArchive({ getDataOfThisDate }: Prop) {
    const [calendarType, setCalendarType] = useState("gregorian");
    const [clickedDate, setClickedDate] = useState(new DateObject());
    const [clickedDatePersian, setClickedDatePersian] = useState(new DateObject({ calendar: persian, locale: persian_en }));
    function sendDate() {
        if (calendarType == "gregorian") {
            getDataOfThisDate(new DateObject(clickedDate).format());
        } else if (calendarType == "jalali") {
            getDataOfThisDate(new DateObject(clickedDatePersian).convert(undefined).format());
        }
    }
    return (
        <div className="calendar mb-4">
            <h5 className="text-customRed mb-4">Select a date:</h5>
            <Row>
                <Col xs={8}>
                    {calendarType == "gregorian" && <div className="input">{new DateObject(clickedDate).format()}</div>}
                    {calendarType == "jalali" && <div className="input">{new DateObject(clickedDatePersian).format()}</div>}
                </Col>
                <Col className="ps-0" xs={4}><Button className="fw-bold button" variant="customGreen" onClick={sendDate}><FontAwesomeIcon className="me-1" icon={faMagnifyingGlass} size="sm" />Find</Button></Col>
            </Row>
            <div className="mt-3 gray-border">
                <Row className="mb-2 ">
                    <Col xs={1}><FontAwesomeIcon className="ms-2 mt-2" icon={faCalendarDays} /></Col>
                    <Col xs={10}>
                        <Form.Control
                            className="select"
                            as="select"
                            value={calendarType}
                            onChange={e => {
                                setCalendarType(e.target.value);
                            }}>
                            <option value="jalali">Jalali calendar</option>
                            <option value="gregorian">Gregorian calendar</option>
                        </Form.Control>
                    </Col>
                </Row>
                {calendarType == "gregorian" &&
                    <Calendar
                        value={clickedDate}
                        className="calendar-width customColor bg-primary justify-content-center"
                        onChange={(dateObject) => {
                            if (dateObject instanceof DateObject) {
                                setClickedDate(dateObject);
                            }
                        }} />
                }
                {calendarType == "jalali" &&
                    <Calendar
                        value={clickedDatePersian}
                        calendar={persian}
                        locale={persian_en}
                        className="calendar-width customColor bg-primary"
                        onChange={(dateObject) => {
                            if (dateObject instanceof DateObject) {
                                setClickedDatePersian(dateObject)
                            }
                        }} />
                }
            </div>
        </div>
    )
}