import "./currencyConverter.scss"
import { useState } from "react";
import { DropdownButton, Dropdown, Form, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightLeft, faUpDown } from '@fortawesome/free-solid-svg-icons'
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { ICurrency } from "../../interfaces.ts"
import { SelectCallback } from "@restart/ui/esm/types";

type Props = {
    curenciesStatus: ICurrency[];
};

export default function CurrencyConverter({ curenciesStatus }: Props) {

    const [currencyAmount, setCurrencyAmount] = useState("0");
    const [targetCurrencyAmount, setTargetCurrencyAmount] = useState("0");

    const [selected, setSelected] = useState('usd');
    const [selectedTargetCurrency, setSelectedTargetCurrency] = useState('irr');

    const [errorAllert, setErrorAlert] = useState(false)

    function getCurrencyByCode(code: string) {
        return curenciesStatus.find((currency: ICurrency) => currency.code === code);
    }

    function convert(value: number) {
        change(selected, selectedTargetCurrency, value, true);
    }
    function convertReverse(value: number) {
        change(selected, selectedTargetCurrency, value, false);
    }

    function change(from: string, to: string, amount: number, isSource: boolean) {
        const fromCurrency = getCurrencyByCode(from);
        if (fromCurrency === undefined) {
            setErrorAlert(true);
            return;
        } else {
            setErrorAlert(false);
        }
        const toCurrency = getCurrencyByCode(to);
        if (toCurrency === undefined) {
            setErrorAlert(true);
            return;
        } else {
            setErrorAlert(false);
        }

        if (isSource) {
            setCurrencyAmount(amount.toString());
            setTargetCurrencyAmount((amount * parseInt(fromCurrency.price_sell) / parseFloat(toCurrency.price_sell)).toString());
        } else {
            setTargetCurrencyAmount(amount.toString());
            setCurrencyAmount((amount * parseInt(toCurrency.price_sell) / parseInt(fromCurrency.price_sell)).toString());
        }
    }

    const onChangeSourceCurrency: SelectCallback = (value) => {
        if (value === null) {
            return;
        }
        setSelected(value);
        change(value, selectedTargetCurrency, Number(currencyAmount), true);
    }

    const onChangeTargetCurrency: SelectCallback = (value) => {
        if (value === null) {
            return;
        }
        setSelectedTargetCurrency(value);
        change(selected, value, Number(currencyAmount), true);
    }

    function findCurrencyName(curenciesStatus: ICurrency[], code: string) {
        const cur = curenciesStatus.find(({ code }) => code === code);
        if (cur === undefined) {
            return;
        } else {
            return cur.name;
        }
    }

    function getTilte(code: string) {
        return (
            <span>
                {
                    curenciesStatus.find(({ code }) => code === code) &&
                    <span>
                        <span className={`me-2 rounded-1 fi fi-${code.slice(0, 2)}`}></span>
                        <span>{code.toUpperCase()} - {findCurrencyName(curenciesStatus, code)}</span>
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
                onSelect={onChangeSourceCurrency}
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
            <Form.Control className="my-2 amountOfCurrencyInput" type="text" placeholder="0" value={Number(currencyAmount).toLocaleString()} onChange={(e) => { convert(Number((e.target.value).replace(/\D/g,''))) }} />
            <div className="m-4 d-flex justify-content-center text-customGreen"><FontAwesomeIcon size="2xl" className="up-icon-in-convert" icon={faUpDown} /></div>
            <div className="my-4">Currency I Want</div>
            <DropdownButton
                className="converter-dropden"
                variant="success"
                onSelect={onChangeTargetCurrency}
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
            <Form.Control className="my-2 amountOfCurrencyInput" placeholder="0" type="text" value={Number(targetCurrencyAmount).toLocaleString()} onChange={(e) => { convertReverse(Number((e.target.value).replace(/\D/g,''))) }} />
            {errorAllert && <Alert className="mt-3 bg-customRed white  text-center">
                Invalide Input
            </Alert>}
        </div>

    );
}