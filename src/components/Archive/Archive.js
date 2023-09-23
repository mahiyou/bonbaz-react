import { Col, Container, Row, Alert } from "react-bootstrap";
import TableOfCurrencies from "../TableOfCurrencies/TableOfCurrencies";
import CalendarOfArchive from "../CalendarOfArchive/CalendarOfArchive"
import { useState, useEffect } from "react";
import "./archive.scss"

export default function Archive() {

    const [currencies, setCurrencies] = useState([]);
    const [coins, setCoins] = useState([]);
    const [serverError, setServerError] = useState(false);

    const [colTitleForCurrencies] = useState(['Code', 'Currency', 'Sell', 'Buy'])
    const [colTitleForEmamiCoins] = useState(['Emami coins', 'Sell', 'Buy'])
    const [colTitleForPersianCoins] = useState(['Persian coins', 'Sell', 'Buy'])

    const halfCurenciesStatus = Math.ceil(currencies.length / 2);
    const firstHalfCurenciesStatus = currencies.slice(0, halfCurenciesStatus)
    const secondHalfCurenciesStatus = currencies.slice(halfCurenciesStatus)

    const halfCoinsStatus = Math.ceil(coins.length / 2);
    const firstHalfCoinsStatus = coins.slice(0, halfCoinsStatus)
    const secondHalfCoinsStatus = coins.slice(halfCoinsStatus)

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch('/mocks/currencies.json');
                const data = await res.json()
                setCurrencies(data.currencies);
                setCoins(data.golds.coins);
            }
            catch (e) {
                setServerError(true);
            }
        }
        fetchData();
    }, [])

    async function getDataOfThisDate(calendarType, date) {
        try {
            const res = '';
            if (calendarType == "gregorian") {
                console.log(date);
                res = await fetch(`/mocks/currencies.json?date="${date}"`);
            } else if (calendarType == "jalali") {
                console.log(date);
                res = await fetch(`/mocks/currencies.json?jalali_date="${date}"`);
            }
            const data = await res.json()
            setCurrencies(data.currencies);
            setCoins(data.golds.coins);
        }
        catch (e) {
            setServerError(true);
        }
    }
    return (
        <Container className="mt-5 pb-5">
            <Row className="justify-content-center">
                <Col xs={11} md={6} sm={7} xl={3} >
                    <CalendarOfArchive getDataOfThisDate={getDataOfThisDate} />
                </Col>
                {serverError && <Alert className="bg-customRed white  text-center">
                    Server dosn't response.Try again.
                </Alert>}
                <Col xs={12} xl={9}>
                    <Row>
                        <Col lg={6} xs={12} className="px-1">
                            <TableOfCurrencies tableType="currency" colTitles={colTitleForCurrencies} curenciesStatus={firstHalfCurenciesStatus} />
                        </Col>
                        <Col lg={6} xs={12} className="px-1">
                            <TableOfCurrencies tableType="currency" colTitles={colTitleForCurrencies} curenciesStatus={secondHalfCurenciesStatus} />
                        </Col>
                        <Col lg={6} xs={12} className="px-1">
                            <TableOfCurrencies tableType="coin" colTitles={colTitleForEmamiCoins} curenciesStatus={firstHalfCoinsStatus} />
                        </Col>
                        <Col lg={6} xs={12} className="px-1">
                            <TableOfCurrencies tableType="coin" colTitles={colTitleForPersianCoins} curenciesStatus={secondHalfCoinsStatus} />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}