import "./currencyConverter.scss"
import { useState } from "react";
import { DropdownButton, Dropdown, Form } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightLeft, faUpDown } from '@fortawesome/free-solid-svg-icons'


export default function CurrencyConverter({ curenciesStatus }) {


    const [selected, setSelected] = useState({ key: 1, eventKey: 1 });
    const handleSelect = (key, event) => {
        setSelected({ key, value: event.target.value });
    };
    const [selectedTargetCurrency, setSelectedTargetCurrency] = useState({ key: 0, eventKey: 0 });
    const handleSelectTargetCurrency = (key, event) => {
        setSelectedTargetCurrency({ key, value: event.target.value });
    };
    function getTilte(key) {
        return (
            <span>
                <img
                    className="me-1 mb-1"
                    src={curenciesStatus[key].icon}
                    width="18"
                    alt="React Bootstrap logo" />
                <span>{curenciesStatus[key].code} - {curenciesStatus[key].currency}</span>
            </span>
        )
    }
    return (
        <div className="currencyConverter mt-5 mb-4">
            <div className="fw-bold"><FontAwesomeIcon className="icon-in-converter mx-1" size="sm" icon={faRightLeft} />Currency Converter</div>
            <div className="title mt-4 mb-2">Currency I Have</div>
            <DropdownButton
                className="converter-dropden"
                variant="success"
                onSelect={handleSelect}
                title={getTilte(selected.key)}>
                {curenciesStatus.map((item, index) =>
                (
                    <Dropdown.Item key={index} eventKey={index}>
                        <img
                            className="me-1 mb-1"
                            src={item.icon}
                            width="18"
                            alt="React Bootstrap logo"
                        />
                        {item.code}{item.currency}
                    </Dropdown.Item>
                )
                )}
            </DropdownButton>
            <Form.Control className="my-2 amountOfCurrencyInput" type="number" placeholder="0" min={0} typeof="number"/>
            <div className="m-4 d-flex justify-content-center text-customGreen"><FontAwesomeIcon size="2xl" className="up-icon-in-convert" icon={faUpDown} /></div>
            <div className="title my-4">Currency I Want</div>
            <DropdownButton
                className="converter-dropden"
                variant="success"
                onSelect={handleSelectTargetCurrency}
                title={getTilte(selectedTargetCurrency.key)}>
                {curenciesStatus.map((item, index) =>
                (
                    <Dropdown.Item key={index} eventKey={index}>
                        <img
                            className="me-1 mb-1"
                            src={item.icon}
                            width="18"
                            alt="React Bootstrap logo"
                        />
                        {item.code}{item.currency}
                    </Dropdown.Item>
                )
                )}
            </DropdownButton>
            <Form.Control className="my-2 amountOfCurrencyInput" type="number" placeholder="0" min={0} typeof="number"/>
        </div>

    );
}