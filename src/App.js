import Navbar from "./components/Navbar/NavBar";
import Footer from "./components/Footer/Footer";
import Card from "./components/Card/Card";
import { useState } from "react";
import { Container } from "react-bootstrap";
function App() {
  const [cardsContent, setCardsContent] = useState([
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
  const [bottomCardsContent, setBottomCardsContent] = useState([
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
  return (
    <div>
      <Navbar />
      <Container className="mt-4">
        {cardsContent.map((cardContent, index) => <Card key={index} title={cardContent.title} cost={cardContent.cost} currency={cardContent.currency} icon={cardContent.icon} trend={cardContent.trend} />)}
      </Container>
      <Container className="mt-4">
        {bottomCardsContent.map((bottomCardsContent, index) => <Card key={index} title={bottomCardsContent.title} cost={bottomCardsContent.cost} currency={bottomCardsContent.currency} icon={bottomCardsContent.icon} trend={bottomCardsContent.trend} />)}
      </Container>
      <Footer />
    </div>
  );
}

export default App;
