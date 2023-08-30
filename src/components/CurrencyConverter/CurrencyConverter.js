import "./currencyConverter.scss"
import { useState } from "react";
import { DropdownButton, Dropdown, Form, Button} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightLeft, faUpDown } from '@fortawesome/free-solid-svg-icons'
import "/node_modules/flag-icons/css/flag-icons.min.css";


export default function CurrencyConverter({ curenciesStatus }) {

    const [currencyAmount, setCurrencyAmount] = useState(0);
    const [targetCurrencyAmount, setTargetCurrencyAmount] = useState(0);

    const [selected, setSelected] = useState({ key: 1, eventKey: 1 });
    const handleSelect = (key, event) => {
        setSelected({ key, value: event.target.value });
    };
    const [selectedTargetCurrency, setSelectedTargetCurrency] = useState({ key: 0, eventKey: 0 });
    const handleSelectTargetCurrency = (key, event) => {
        setSelectedTargetCurrency({ key, value: event.target.value });
    };
    function convert(value){
        setCurrencyAmount(value)
        setTargetCurrencyAmount(value*curenciesStatus[selected.key].price_sell/curenciesStatus[selectedTargetCurrency.key].price_sell)
    }
    function convertReverze(value){
        setTargetCurrencyAmount(value)
        setCurrencyAmount(value*curenciesStatus[selectedTargetCurrency.key].price_sell/curenciesStatus[selected.key].price_sell)
    }
    function getTilte(key) {
        return (
            <span>
                <span className={`me-2 rounded-1 fi fi-${curenciesStatus[key].code.slice(0, 2)}`}></span>
                {curenciesStatus[key] && <span>{(curenciesStatus[key].code).toUpperCase()} - {curenciesStatus[key].name}</span>}
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
                onSelect={handleSelect}
                title={getTilte(selected.key)}>
                {curenciesStatus.map((item, index) =>
                (
                    <Dropdown.Item key={index} eventKey={index}>
                        <span className={`me-2 rounded-1 fi fi-${item.code.slice(0, 2)}`}></span>
                        {(item.code).toUpperCase()} - {item.name}
                    </Dropdown.Item>
                )
                )}
            </DropdownButton>
            <Form.Control className="my-2 amountOfCurrencyInput" type="number" placeholder="0" min={0} value={currencyAmount} onChange={(e)=>{convert(e.target.value)}}/>
            <div className="m-4 d-flex justify-content-center text-customGreen"><FontAwesomeIcon size="2xl" className="up-icon-in-convert" icon={faUpDown} /></div>
            <div className="my-4">Currency I Want</div>
            <DropdownButton
                className="converter-dropden"
                variant="success"
                onSelect={handleSelectTargetCurrency}
                title={getTilte(selectedTargetCurrency.key)}>
                {curenciesStatus.map((item, index) =>
                (
                    <Dropdown.Item key={index} eventKey={index}>
                        <span className={`me-2 rounded-1 fi fi-${item.code.slice(0, 2)}`}></span>
                        {(item.code.toUpperCase())} - {item.name}
                    </Dropdown.Item>
                )
                )}
            </DropdownButton>
            <Form.Control className="my-2 amountOfCurrencyInput"  placeholder="0" type="number" min={0} value={targetCurrencyAmount} onChange={(e)=>{convertReverze(e.target.value)}} />
        </div>

    );
}