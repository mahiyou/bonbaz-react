import { DropdownButton, Dropdown, Row, Col, Button } from "react-bootstrap";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian"
import persian_en from "react-date-object/locales/persian_en"
import { ICurrency } from "../../interfaces.ts"
import { useState } from "react";
import './DateRangePicker.scss';

type Props = {
    currency: ICurrency
}
function CurrencyOption({ currency }: Props) {
    return (
        <span>
            <span className={`me-2 rounded-1 fi fi-${currency.code.slice(0, 2)}`}></span>
            <span>{(currency.code).toUpperCase()} - {currency.name}</span>
        </span>
    );
}

type DateProps = {
    onChange: (currency: { code: string, name: string }, calendar: string, fromDate: string, toDate: string) => any
    currencies: ICurrency[]
}

export default function DateRangePicker({ onChange, currencies }: DateProps) {
    const [selected, setSelected] = useState({ key: 0, eventKey: 0 });
    const [selectedCalendar, setSelectedCalendar] = useState<string>('Gregorian');
    const [date, setDate] = useState<string>(new DateObject().format())
    const [targetDate, setTargetDate] = useState<string>(new DateObject().format())

    let calendar;
    let locale;

    if (selectedCalendar == "Jalali") {
        calendar = persian;
        locale = persian_en;
    }

    function onSelect(key: string | null, e: React.SyntheticEvent<unknown, Event>) {
        if (null == key || (e.target as any).value === undefined) {
            return
        }

        setSelected({ key: parseInt(key), eventKey: (e.target as any).value });
    }

    function onDateChange(selectedDates: DateObject | DateObject[] | null) {
        if (selectedDates instanceof DateObject) {
            setDate(selectedDates.format());
        }
    }
    function onTargetDateChange(selectedDates: DateObject | DateObject[] | null) {
        if (selectedDates instanceof DateObject) {
            setTargetDate(selectedDates.format());
        }
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
                        onSelect={onSelect}
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
                        onSelect={(event) => setSelectedCalendar(event ?? '')}
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
                    <DatePicker calendar={calendar} locale={locale} offsetY={3} className="customColor" arrow={false} value={date} inputClass="custom-input" onChange={onDateChange} />
                </Col>
            </Row>
            <Row className="my-3 align-items-center">
                <Col xs={2}>
                    <div className="text-secondary">To</div>
                </Col>
                <Col xs={10}>
                    <DatePicker calendar={calendar} locale={locale} offsetY={3} className="customColor" arrow={false} value={targetDate} inputClass="custom-input" onChange={onTargetDateChange} />
                </Col>
            </Row>
            <Row>
                <Col xs={2}></Col>
                <Col xs={10}><Button className="my-3 fw-bold button" variant="customGreen" onClick={() => { onChange(currencies[selected.key], selectedCalendar, date, targetDate) }}><FontAwesomeIcon className="me-1" icon={faMagnifyingGlass} size="sm" />Find</Button></Col>
            </Row>
        </div>
    )
}
