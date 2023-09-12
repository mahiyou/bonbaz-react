import { DropdownButton, Dropdown, Row, Col, Button } from "react-bootstrap";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian"
import persian_en from "react-date-object/locales/persian_en"

import { useState, useEffect } from "react";
import './DateRangePicker.scss';

function CurrencyOption({currency}) {
    return (
        <span>
            <span className={`me-2 rounded-1 fi fi-${currency.code.slice(0, 2)}`}></span>
            <span>{(currency.code).toUpperCase()} - {currency.name}</span>
        </span>
    );
}

/**
 * @param {{onChange: (currency: {code:string,name: string}, calendar: string, fromDate: DateObject, toDate: DateObject) => any}} props 
 */
export default function DateRangePicker(props) {
    const { onChange,currencies } = props;
    const [serverError, setServerError] = useState(false);
    const [selected, setSelected] = useState({ key: 0, eventKey: 0 });
    const [selectedCalendar, setSelectedCalendar] = useState('Gregorian');
    const [date, setDate] = useState(new DateObject())
    const [targetDate, setTargetDate] = useState(new DateObject())

    let calendar;
    let locale;

    if (selectedCalendar == "Jalali") {
        calendar = persian;
        locale = persian_en;
    }

    return (
        <div className="date-range-picker">
            <h5 className="text-customRed mt-5 mb-5">Select a date:</h5>
            <Row className="my-3 align-items-center">
                <Col xs={2}>
                    <div className="text-secondary">Currency</div>
                </Col>
                <Col xs={10}>
                    <DropdownButton
                        className="currnecies-dropden"
                        variant="success"
                        onSelect={(key, e) => setSelected({ key, value: e.target.value })}
                        title={currencies.length ? <CurrencyOption currency={currencies[selected.key]} /> : ''}>
                        {currencies.map((item, index) =>
                        (
                            <Dropdown.Item key={index} eventKey={index} >
                                <span className={`me-2 rounded-1 fi fi-${item.code.slice(0, 2)}`}></span>
                                {(item.code).toUpperCase()} - {item.name}
                            </Dropdown.Item>
                        )
                        )}
                    </DropdownButton>
                </Col>
            </Row>
            <Row className="my-3 align-items-center">
                <Col xs={2}>
                    <div className="text-secondary">Calendar Type</div>
                </Col>
                <Col xs={10}>
                    <DropdownButton
                        className="currnecies-dropden"
                        variant="success"
                        onSelect={setSelectedCalendar}
                        title={selectedCalendar}>
                        <Dropdown.Item eventKey={"Jalali"}>Jalali</Dropdown.Item>
                        <Dropdown.Item eventKey={"Gregorian"}>Gregorian</Dropdown.Item>
                    </DropdownButton>
                </Col>
            </Row>
            <Row className="my-3 align-items-center">
                <Col xs={2}>
                    <div className="text-secondary">From</div>
                </Col>
                <Col xs={10}>
                    <DatePicker calendar={calendar} locale={locale} offsetY={3} className="customColor" arrow={false} value={targetDate} inputClass="custom-input" format="YYYY . MM . DD" onChange={setDate} />
                </Col>
            </Row>
            <Row className="my-3 align-items-center">
                <Col xs={2}>
                    <div className="text-secondary">To</div>
                </Col>
                <Col xs={10}>
                    <DatePicker calendar={calendar} locale={locale} offsetY={3} className="customColor" arrow={false} value={targetDate} inputClass="custom-input" format="YYYY . MM . DD" onChange={setTargetDate} />
                </Col>
            </Row>
            <Row>
                <Col xs={2}></Col>
                <Col xs={10}><Button className="my-3 fw-bold button" variant="customGreen" onClick={() => { onChange(currencies[selected.key], selectedCalendar, date, targetDate) }}><FontAwesomeIcon className="me-1" icon={faMagnifyingGlass} size="sm" />Find</Button></Col>
            </Row>
        </div>
    )
}
