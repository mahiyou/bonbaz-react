import { Col, Container, Row, Alert } from "react-bootstrap";
import TableOfCurrencies from "../TableOfCurrencies/TableOfCurrencies";
import TableOfCoins from "../TableOfCoins/TableOfCoins";
import CalendarOfArchive from "../CalendarOfArchive/CalendarOfArchive"
import { useState, useEffect } from "react";
import { ICurrency, ICoin } from "../../interfaces.ts"
import "./archive.scss"

async function fetchData() {
    try {
        const res = await fetch('/mocks/currencies.json');
        const data = await res.json()
        return data;
    }
    catch (e) {
        return e
    }
}

function sortCurrencies(currencies: ICurrency[]) {
    const priorities = ['usd', 'eur']
    const sorted = currencies.sort((a, b) => {
        let index1 = priorities.indexOf(a.code)
        let index2 = priorities.indexOf(b.code)
        return index1 == -1 ? 1 : index2 == -1 ? -1 : index1 - index2;
    })
    return (sorted);
}

export default function Archive() {

    const [currencies, setCurrencies] = useState<ICurrency[]>([]);
    const [coins, setCoins] = useState<ICoin[]>([])
    const [serverError, setServerError] = useState(false);

    useEffect(() => {
        fetchData().then((data) => {
            setCurrencies(sortCurrencies(data.currencies));
            setCoins(data.golds.coins);
        })
            .catch(() => {
                setServerError(true);
            })
    }, [])

    const [colTitleForCurrencies] = useState(['Code', 'Currency', 'Sell', 'Buy'])
    const [colTitleForEmamiCoins] = useState(['Emami coins', 'Sell', 'Buy'])
    const [colTitleForPersianCoins] = useState(['Persian coins', 'Sell', 'Buy'])

    const halfCurenciesStatus = Math.ceil(currencies.length / 2);
    const firstHalfCurenciesStatus = currencies.slice(0, halfCurenciesStatus)
    const secondHalfCurenciesStatus = currencies.slice(halfCurenciesStatus)

    const halfCoinsStatus = Math.ceil(coins.length / 2);
    const firstHalfCoinsStatus = coins.slice(0, halfCoinsStatus)
    const secondHalfCoinsStatus = coins.slice(halfCoinsStatus)

    async function getDataOfThisDate(date: string) {
        try {
            const res = await fetch(`/mocks/currencies.json?date="${date}"`);
            const data = await res.json()
            setCurrencies(sortCurrencies(data.currencies));
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
                {serverError && <Alert className="bg-customRed white text-center">
                    Server dosn't response.Try again.
                </Alert>}
                <Col xs={12} xl={9}>
                    <Row>
                        <Col lg={6} xs={12} className="px-1">
                            <TableOfCurrencies colTitles={colTitleForCurrencies} curenciesStatus={firstHalfCurenciesStatus} />
                        </Col>
                        <Col lg={6} xs={12} className="px-1">
                            <TableOfCurrencies colTitles={colTitleForCurrencies} curenciesStatus={secondHalfCurenciesStatus} />
                        </Col>
                        <Col lg={6} xs={12} className="px-1">
                            <TableOfCoins colTitles={colTitleForEmamiCoins} coinsStatus={firstHalfCoinsStatus} />
                        </Col>
                        <Col lg={6} xs={12} className="px-1">
                            <TableOfCoins colTitles={colTitleForPersianCoins} coinsStatus={secondHalfCoinsStatus} />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}