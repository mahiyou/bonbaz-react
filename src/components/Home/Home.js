import Card from "../Card/Card";
import Date from "../Date/Date";
import Ads from "../Ads/Ads";
import CurrencyConverter from "../CurrencyConverter/CurrencyConverter";
import { useState, useEffect } from "react";
import TableOfCurrencies from "../Table/TableOfCurrencies";
import { Col, Container, Row, Alert } from "react-bootstrap";
import "./home.scss";

function Home() {
    const [currencies, setCurrencies] = useState([]);
    const [coins, setCoins] = useState([]);
    const [topCardCurrencies, setTopCardCurrencies] = useState([]);
    const [cryptoCurrencies, setCryptoCurrencies] = useState([]);
    const [serverError, setServerError] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch('/mocks/currencies.json');
                const data = await res.json()
                setCurrencies(data.currencies);
                setCoins(data.golds.coins);
                setCryptoCurrencies(data.crypto_currencies);
                setTopCardCurrencies([
                    { name: "Gold (Once)", price: data.golds.ounce.price, icon: "/imgs/currencies/gold-card.svg", history: data.golds.ounce.history },
                    { name: "Gold (Gram)", price: data.golds.gram.price, icon: "/imgs/currencies/gold-card.svg", history: data.golds.gram.history },
                    { name: "Gold (Mithqal)", price: data.golds.mithqal.price, icon: "/imgs/currencies/gold-card.svg", history: data.golds.mithqal.history },
                    { name: "Gold (Emami)", price: findPrice("emami", data.golds.coins), icon: "/imgs/currencies/gold-card.svg", history: data.golds.coins.find(({ name }) => name === 'emami').history },
                    { name: "Euro / IRR", price: findPrice("Euro", data.currencies), icon: "/imgs/currencies/euro-card.svg", history: data.currencies.find(({ code }) => code === 'eur').history },
                    { name: "US Dollar / IRR", price: findPrice("US Dollar", data.currencies), icon: "/imgs/currencies/usdollar-card.svg", history: data.currencies.find(({ code }) => code === 'usd').history },
                ]);
            }
            catch (e) {
                setServerError(true);
            }
        }
        fetchData();
    }, [])

    function findPrice(curName, targetArray) {
        let index = targetArray.findIndex(cur => cur.name == curName)
        return targetArray[index].price_buy;
    }




    const [colTitleForCurrencies] = useState(['Code', 'Currency', 'Sell', 'Buy'])
    const [colTitleForEmamiCoins] = useState(['Emami coins', 'Sell', 'Buy'])
    const [colTitleForPersianCoins] = useState(['Persian coins', 'Sell', 'Buy'])

    const halfCurenciesStatus = Math.ceil(currencies.length / 2);
    const firstHalfCurenciesStatus = currencies.slice(0, halfCurenciesStatus)
    const secondHalfCurenciesStatus = currencies.slice(halfCurenciesStatus)

    const halfCoinsStatus = Math.ceil(coins.length / 2);
    const firstHalfCoinsStatus = coins.slice(0, halfCoinsStatus)
    const secondHalfCoinsStatus = coins.slice(halfCoinsStatus)

    function addRialToCurrencies() {
        return (
            [{
                code: "irr",
                name: "Iranian Rial",
                price_sell: "1",
                price_buy: "1",
                count: 1,
                updated_at: "",
                history: ""
            }, ...currencies,]
        )
    }

    return (
        <div>
            <Container className="mt-4">
                {serverError && <Alert className="mt-5 mb-5 bg-customRed white  text-center">
                    Server dosn't response.Try again.
                </Alert>}
                <div className="hidden-md-down text-center">
                    {topCardCurrencies.map((importantCurrency, index) =>
                        <Card key={index} targetCurrency={"T"} currency={importantCurrency} />)}
                </div>
                <Date />
                <Row className="justify-content-center">
                    <Col xs={12} lg={9}>
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
                    <Col xs={12} sm={8} lg={3}>
                        <CurrencyConverter curenciesStatus={addRialToCurrencies()} />
                        <Ads />
                    </Col>
                </Row>
                <div className="hidden-lg-up my-4 text-center">{topCardCurrencies.map((importantCurrency, index) =><Card key={index} targetCurrency={"T"} currency={importantCurrency} />)}</div>
                <div className="hidden-md-down my-4 text-center">{cryptoCurrencies.map((cryptoCurrency, index) => <Card key={index} targetCurrency={"$"} currency={cryptoCurrency} icon={`/imgs/currencies/${cryptoCurrency.code}-card.svg`} />)}</div>
            </Container>
        </div>
    );
}

export default Home;
