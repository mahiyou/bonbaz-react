import "./currencyConverter.scss"
import { useState } from "react";
import { DropdownButton, Dropdown, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightLeft, faUpDown } from '@fortawesome/free-solid-svg-icons'
import "/node_modules/flag-icons/css/flag-icons.min.css";


export default function CurrencyConverter({ curenciesStatus }) {

    const [currencyAmount, setCurrencyAmount] = useState(0);
    const [targetCurrencyAmount, setTargetCurrencyAmount] = useState(0);

    const [selected, setSelected] = useState('usd');
    const [selectedTargetCurrency, setSelectedTargetCurrency] = useState('irr');
    function convert(value) {
        setCurrencyAmount(value);
        setTargetCurrencyAmount(value * (curenciesStatus.find(({ code }) => code === selected)).price_sell / (curenciesStatus.find(({ code }) => code === selectedTargetCurrency)).price_sell)
    }
    function convertReverse(value) {
        setTargetCurrencyAmount(value)
        setCurrencyAmount(value * (curenciesStatus.find(({ code }) => code === selectedTargetCurrency)).price_sell / (curenciesStatus.find(({ code }) => code === selected)).price_sell)
    }
    function getTilte(code) {
        return (
            <span>
                {
                    curenciesStatus.find(({ code }) => code === code) &&
                    <span>
                        <span className={`me-2 rounded-1 fi fi-${code.slice(0, 2)}`}></span>
                        <span>{code.toUpperCase()} - {curenciesStatus.find(({ code }) => code === code).name}</span> 
                    </span>
                }
            </span>
        )
    }
    return (
        <div className="currencyConverter mt-5 mt-lg-0 mt-xl-5 mb-4">
            <div className="fw-bold"><FontAwesomeIcon className="icon-in-converter mx-2" size="lg" icon={faRightLeft} />Currency Converter</div>
            <div className="my-4">Currency I Have</div>
            <DropdownButton
                className="converter-dropden"
                variant="success"
                onSelect={(e) => {setSelected(e)}}
                title={getTilte(selected)}>
                {curenciesStatus.map((item, index) =>
                (
                    <Dropdown.Item key={index} eventKey={item.code}>
                        <span className={`me-2 rounded-1 fi fi-${item.code.slice(0, 2)}`}></span>
                        {(item.code).toUpperCase()} - {item.name}
                    </Dropdown.Item>
                )
                )}
            </DropdownButton>
            <Form.Control className="my-2 amountOfCurrencyInput" type="number" placeholder="0" min={0} value={currencyAmount} onChange={(e) => { convert(e.target.value) }} />
            <div className="m-4 d-flex justify-content-center text-customGreen"><FontAwesomeIcon size="2xl" className="up-icon-in-convert" icon={faUpDown} /></div>
            <div className="my-4">Currency I Want</div>
            <DropdownButton
                className="converter-dropden"
                variant="success"
                onSelect={(e) => {setSelectedTargetCurrency(e)}}
                title={getTilte(selectedTargetCurrency)}>
                {curenciesStatus.map((item, index) =>
                (
                    <Dropdown.Item key={index} eventKey={item.code}>
                        <span className={`me-2 rounded-1 fi fi-${item.code.slice(0, 2)}`}></span>
                        {(item.code.toUpperCase())} - {item.name}
                    </Dropdown.Item>
                )
                )}
            </DropdownButton>
            <Form.Control className="my-2 amountOfCurrencyInput" placeholder="0" type="number" min={0} value={targetCurrencyAmount} onChange={(e) => { convertReverse(e.target.value) }} />
        </div>

    );
}