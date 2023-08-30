import { Calendar } from "react-multi-date-picker"
import { useState } from "react";
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import persian_en from "react-date-object/locales/persian_en";
import { DateObject } from "react-multi-date-picker";
import { Form, FormControl, Button, Row, Col, FormGroup } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faCalendarDays, faSortDown } from '@fortawesome/free-solid-svg-icons'
import "./calendarOfArchive.scss"

export default function CalendarOffArchive() {
    const [calendarType, setCalendarType] = useState("gregorian");
    const [clickedDate, setClickedDate] = useState(new DateObject());
    const [clickedDatePersian, setClickedDatePersian] = useState(new DateObject({ calendar: persian, locale: persian_fa }));

    const [mdate, setMdate] = useState();

    function showDate(calendarType, date) {
        if (calendarType == "gregorian") {
            let mdate2 = new DateObject(date).format();
            return mdate2;
        } else if (calendarType == "jalali") {
            let mdate2 = new DateObject(date).convert(persian, persian_en).format();
            return mdate2;
        }
    }
    return (
        <div className="calendar">
            <h5 className="text-customRed mb-4">Select a date:</h5>
            <Row>
                <Col xs={8}>
                   {calendarType == "gregorian" && <div className="input">{new DateObject(clickedDate).format()}</div>}
                   {calendarType == "jalali" && <div className="input">{new DateObject(clickedDatePersian).format()}</div>}
                </Col>
                <Col className="ps-0" xs={4}><Button className="fw-bold button" variant="customGreen"><FontAwesomeIcon className="me-1" icon={faMagnifyingGlass} size="sm" />Find</Button></Col>
            </Row>
            <div className="mt-3 gray-border">
                <Row className="mb-2">
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
                        className="calendar-width customColor bg-primary"
                        onChange={setClickedDate} />
                }
                {calendarType == "jalali" &&
                    <Calendar
                        value={clickedDatePersian}
                        calendar={persian}
                        locale={persian_fa}
                        className="calendar-width customColor bg-primary"
                        onChange={setClickedDatePersian} />
                }
            </div>
        </div>
    )
}