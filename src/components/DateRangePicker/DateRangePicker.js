import { DropdownButton, Dropdown, Row, Col, Button } from "react-bootstrap";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DatePicker, { DateObject } from "react-multi-date-picker";

import { useState, useEffect } from "react";
import './DateRangePicker.scss';
export default function DateRangePicker() {
    const [currencies, setCurrencies] = useState([]);
    const [serverError, setServerError] = useState(false);
    const [selected, setSelected] = useState({ key: 1, eventKey: 1 });
    const [date, setDate] = useState(new DateObject())
    const [targetDate, setTargetDate] = useState(new DateObject())
    const handleSelect = (key, event) => {
        setSelected({ key, value: event.target.value });
    };

    function getTilte(key) {
        return (
            <span>
                {
                    currencies[key] &&
                    <span>
                        <span className={`me-2 rounded-1 fi fi-${currencies[key].code.slice(0, 2)}`}></span>
                        <span>{(currencies[key].code).toUpperCase()} - {currencies[key].name}</span>
                    </span>
                }
            </span>
        )
    }
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch('/mocks/currencies.json');
                const data = await res.json()
                setCurrencies(data.currencies);
            }
            catch (e) {
                setServerError(true);
            }
        }
        fetchData();
    }, [])

    return (
        <div>
            <h5 className="text-customRed mt-5 mb-5">Select a date:</h5>
            <Row className="my-3 align-items-center">
                <Col xs={2}>
                    <div className="text-secondary">Currency</div>
                </Col>
                <Col xs={10}>
                    <DropdownButton
                        className="currnecies-dropden"
                        variant="success"
                        onSelect={handleSelect}
                        title={getTilte(selected.key)}>
                        {currencies.map((item, index) =>
                        (
                            <Dropdown.Item key={index} eventKey={index}>
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
                    <div className="text-secondary">From</div>
                </Col>
                <Col xs={10}>
                    <DatePicker className="bg-primary customColor" arrow={false} value={date} inputClass="custom-input" format="YYYY . MM . DD" />
                </Col>
            </Row>
            <Row className="my-3 align-items-center">
                <Col xs={2}>
                    <div className="text-secondary">To</div>
                </Col>
                <Col xs={10}>
                    <DatePicker className="bg-primary customColor" arrow={false} value={targetDate} inputClass="custom-input" format="YYYY . MM . DD" />
                </Col>
            </Row>
            <Row>
                <Col xs={2}></Col>
                <Col xs={10}><Button className="my-3 fw-bold button" variant="customGreen"><FontAwesomeIcon className="me-1" icon={faMagnifyingGlass} size="sm" />Find</Button></Col>
            </Row>
        </div>
    )
}
