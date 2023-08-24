import Navbar from "./components/Navbar/NavBar";
import Footer from "./components/Footer/Footer";
import Card from "./components/Card/Card";
import Date from "./components/Date/Date";
import Ads from "./components/Ads/Ads";
import CurrencyConverter from "./components/CurrencyConverter/CurrencyConverter";
import { useState } from "react";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TableOfCurrencies from "./components/Table/TableOfCurrencies";
import "./app.scss";



function App() {

  const [cardsContent] = useState([
    {
      title: "Gold(Once)",
      cost: 1913.83,
      currency: "$",
      icon: "/imgs/coin-in-cards.svg",
      trend: "up",
      diagram: ""
    },
    {
      title: "Gold(Gram)",
      cost: 2320051,
      currency: "T",
      icon: "/imgs/coin-in-cards.svg",
      trend: "down",
      diagram: ""
    },
    {
      title: "Gold(Mithqal)",
      cost: 10058000,
      currency: "T",
      icon: "/imgs/coin-in-cards.svg",
      trend: "up",
      diagram: ""
    },
    {
      title: "Gold(Emami)",
      cost: 28100000,
      currency: "T",
      icon: "/imgs/coin-in-cards.svg",
      trend: "down",
      diagram: ""
    },
    {
      title: "Euro/IRR",
      cost: 54050,
      currency: "T",
      icon: "/imgs/euro-icon.svg",
      trend: "fixed",
      diagram: ""
    },
    {
      title: "Us Dollar/IRR",
      cost: 49400,
      currency: "T",
      icon: "/imgs/dollar-icon.svg",
      trend: "fixed",
      diagram: ""
    }
  ]);
  const [bottomCardsContent] = useState([
    {
      title: "Bitcoin/BTC",
      cost: 29337.91,
      currency: "$",
      icon: "/imgs/digital-currency/BTC-icon.svg",
      trend: "up",
      diagram: ""
    },
    {
      title: "Ethereum/ETH",
      cost: 1833.03,
      currency: "$",
      icon: "/imgs/digital-currency/Eth-icon.svg",
      trend: "up",
      diagram: ""
    },
    {
      title: "TRON/TRX",
      cost: 0.07744,
      currency: "$",
      icon: "/imgs/digital-currency/TRX-icon.svg",
      trend: "down",
      diagram: ""
    },
    {
      title: "Cardano/ADA",
      cost: 0.29094,
      currency: "$",
      icon: "/imgs/digital-currency/ADA-icon.svg",
      trend: "up",
      diagram: ""
    },
    {
      title: "Polkadot/DOT",
      cost: 4.9951,
      currency: "$",
      icon: "/imgs/digital-currency/DOT-icon.svg",
      trend: "fixed",
      diagram: ""
    },
    {
      title: "Dogecoin/DOGE",
      cost: 0.0746300,
      currency: "$",
      icon: "/imgs/digital-currency/DOGE-icon.svg",
      trend: "up",
      diagram: ""
    }
  ]);
  const [curenciesStatus] = useState([
    {
      icon: "/imgs/digital-currency/US-squer.svg",
      code: "1USD",
      currency: "US Dollar",
      count: 1,
      sell:
      {
        amount: 45600,
        trend: "down"
      },
      buy:
      {
        amount: 48500,
        trend: "fixed"
      },
    },
    {
      icon: "/imgs/digital-currency/US-squer.svg",
      code: "2USD",
      currency: "US Dollar",
      count: 1,
      sell:
      {
        amount: 47,
        trend: "up"
      },
      buy:
      {
        amount: 48500,
        trend: "down"
      },
    },
    {
      icon: "/imgs/digital-currency/US-squer.svg",
      code: "3USD",
      currency: "CAD Canadian Dollar",
      count: 1,
      sell:
      {
        amount: 45600,
        trend: "down"
      },
      buy:
      {
        amount: 48500,
        trend: "down"
      },
    },
    {
      icon: "/imgs/digital-currency/US-squer.svg",
      code: "3USD",
      currency: "CAD Canadian Dollar",
      count: 1,
      sell:
      {
        amount: 45600,
        trend: "fixed"
      },
      buy:
      {
        amount: 48500,
        trend: "fixed"
      },
    },
    {
      icon: "/imgs/digital-currency/US-squer.svg",
      code: "3USD",
      currency: "CAD Canadian Dollar",
      count: 1,
      sell:
      {
        amount: 45600,
        trend: "up"
      },
      buy:
      {
        amount: 48500,
        trend: "up"
      },
    },
    {
      icon: "/imgs/digital-currency/US-squer.svg",
      code: "3USD",
      currency: "CAD Canadian Dollar",
      count: 1,
      sell:
      {
        amount: 45600,
        trend: "down"
      },
      buy:
      {
        amount: 48500,
        trend: "down"
      },
    },
    {
      icon: "/imgs/digital-currency/US-squer.svg",
      code: "3USD",
      currency: "CAD Canadian Dollar",
      count: 1,
      sell:
      {
        amount: 45600,
        trend: "up"
      },
      buy:
      {
        amount: 48500,
        trend: "down"
      },
    },
    {
      icon: "/imgs/digital-currency/US-squer.svg",
      code: "3USD",
      currency: "CAD Canadian Dollar",
      count: 1,
      sell:
      {
        amount: 45600,
        trend: "up"
      },
      buy:
      {
        amount: 48500,
        trend: "down"
      },
    },
    {
      icon: "/imgs/digital-currency/US-squer.svg",
      code: "3USD",
      currency: "CAD Canadian Dollar",
      count: 1,
      sell:
      {
        amount: 45600,
        trend: "up"
      },
      buy:
      {
        amount: 48500,
        trend: "down"
      },
    },
    {
      icon: "/imgs/digital-currency/US-squer.svg",
      code: "3USD",
      currency: "CAD Canadian Dollar",
      count: 1,
      sell:
      {
        amount: 45600,
        trend: "up"
      },
      buy:
      {
        amount: 48500,
        trend: "down"
      },
    },
    {
      icon: "/imgs/digital-currency/US-squer.svg",
      code: "3USD",
      currency: "CAD Canadian Dollar",
      count: 1,
      sell:
      {
        amount: 45600,
        trend: "up"
      },
      buy:
      {
        amount: 48500,
        trend: "down"
      },
    },
    {
      icon: "/imgs/digital-currency/US-squer.svg",
      code: "3USD",
      currency: "CAD Canadian Dollar",
      count: 1,
      sell:
      {
        amount: 45600,
        trend: "up"
      },
      buy:
      {
        amount: 48500,
        trend: "down"
      },
    },
    {
      icon: "/imgs/digital-currency/US-squer.svg",
      code: "3USD",
      currency: "CAD Canadian Dollar",
      count: 1,
      sell:
      {
        amount: 45600,
        trend: "up"
      },
      buy:
      {
        amount: 48500,
        trend: "down"
      },
    },
    {
      icon: "/imgs/digital-currency/US-squer.svg",
      code: "3USD",
      currency: "CAD Canadian Dollar",
      count: 1,
      sell:
      {
        amount: 45600,
        trend: "up"
      },
      buy:
      {
        amount: 48500,
        trend: "down"
      },
    },


  ])
  const [coinsStatus] = useState([
    {
      icon: "/imgs/digital-currency/coin.svg",
      code: "Azadi",
      sell:
      {
        amount: 25500000,
        trend: "up"
      },
      buy:
      {
        amount: 25400000,
        trend: "fixed"
      },
    },
    {
      icon: "/imgs/digital-currency/coin.svg",
      code: "Azadi",
      sell:
      {
        amount: 25500000,
        trend: "up"
      },
      buy:
      {
        amount: 25400000,
        trend: "fixed"
      },
    },
    {
      icon: "/imgs/digital-currency/coin.svg",
      code: "Azadi",
      sell:
      {
        amount: 25500000,
        trend: "up"
      },
      buy:
      {
        amount: 25400000,
        trend: "fixed"
      },
    },
    {
      icon: "/imgs/digital-currency/coin.svg",
      code: "Azadi",
      sell:
      {
        amount: 25500000,
        trend: "up"
      },
      buy:
      {
        amount: 25400000,
        trend: "fixed"
      },
    },
    {
      icon: "/imgs/digital-currency/coin.svg",
      code: "1/2 Azadi",
      sell:
      {
        amount: 25500000,
        trend: "up"
      },
      buy:
      {
        amount: 25400000,
        trend: "fixed"
      },
    },
    {
      icon: "/imgs/digital-currency/coin.svg",
      code: "parsian 0/200",
      sell:
      {
        amount: 541000,
        trend: "up"
      },
      buy:
      {
        amount: 25400000,
        trend: "fixed"
      },
    },
    {
      icon: "/imgs/digital-currency/coin.svg",
      code: "parsian 0/200",
      sell:
      {
        amount: 541000,
        trend: "up"
      },
      buy:
      {
        amount: 25400000,
        trend: "fixed"
      },
    },
    {
      icon: "/imgs/digital-currency/coin.svg",
      code: "parsian 0/200",
      sell:
      {
        amount: 541000,
        trend: "up"
      },
      buy:
      {
        amount: 25400000,
        trend: "fixed"
      },
    },
    {
      icon: "/imgs/digital-currency/coin.svg",
      code: "parsian 0/200",
      sell:
      {
        amount: 541000,
        trend: "up"
      },
      buy:
      {
        amount: 25400000,
        trend: "fixed"
      },
    },
    {
      icon: "/imgs/digital-currency/coin.svg",
      code: "parsian 0/200",
      sell:
      {
        amount: 541000,
        trend: "up"
      },
      buy:
      {
        amount: 25400000,
        trend: "fixed"
      },
    },
  ])

  const [colTitleForCurrencies] = useState(['Code', 'Currency', 'count', 'sell', 'buy'])
  const [colTitleForEmamiCoins] = useState(['Emami coins', 'sell', 'buy'])
  const [colTitleForPersianCoins] = useState(['Persian coins', 'sell', 'buy'])

  const halfCurenciesStatus = Math.ceil(curenciesStatus.length / 2);
  const firstHalfCurenciesStatus = curenciesStatus.slice(0, halfCurenciesStatus)
  const secondHalfCurenciesStatus = curenciesStatus.slice(halfCurenciesStatus)

  const halfCoinsStatus = Math.ceil(coinsStatus.length / 2);
  const firstHalfCoinsStatus = coinsStatus.slice(0, halfCoinsStatus)
  const secondHalfCoinsStatus = coinsStatus.slice(halfCoinsStatus)

  function addRialToCurrencies() {
    return (
      [{icon: "/imgs/flag-of-iran.svg",
        code: "Toman",
        currency: "Iranian Rial",
        sell:
        {
          amount: 1,
          trend: "fixed"
        },
        buy:
        {
          amount: 1,
          trend: "fixed"
        },
      },...curenciesStatus,]
    )
  }

  return (
    <div>
      <Navbar />
      <Container className="mt-4">
        <div>{cardsContent.map((cardContent, index) => <Card key={index} title={cardContent.title} cost={cardContent.cost} currency={cardContent.currency} icon={cardContent.icon} trend={cardContent.trend} />)}</div>
        <Date />
        <Row>
          <Col xs={9}>
            <Row>
              <Col xs={6} className="px-1">
                <TableOfCurrencies tableType="currency" colTitles={colTitleForCurrencies} curenciesStatus={firstHalfCurenciesStatus} />
                <TableOfCurrencies tableType="coin" colTitles={colTitleForEmamiCoins} curenciesStatus={firstHalfCoinsStatus} />
              </Col>
              <Col xs={6} className="px-1">
                <TableOfCurrencies tableType="currency" colTitles={colTitleForCurrencies} curenciesStatus={secondHalfCurenciesStatus} />
                <TableOfCurrencies tableType="coin" colTitles={colTitleForPersianCoins} curenciesStatus={secondHalfCoinsStatus} />
              </Col>
            </Row>
          </Col>
          <Col xs={3}>

            <CurrencyConverter curenciesStatus={addRialToCurrencies()} />
            <Ads />
          </Col>
        </Row>
        <div>{bottomCardsContent.map((bottomCardsContent, index) => <Card key={index} title={bottomCardsContent.title} cost={bottomCardsContent.cost} currency={bottomCardsContent.currency} icon={bottomCardsContent.icon} trend={bottomCardsContent.trend} />)}</div>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
