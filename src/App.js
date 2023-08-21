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
  return (
    <div>
      <Navbar />
      <Container className="mt-4">
        {cardsContent.map((cardContent, index) => <Card key={index} title={cardContent.title} cost={cardContent.cost} currency={cardContent.currency} icon={cardContent.icon} trend={cardContent.trend} />)}
      </Container>
      <Footer />
    </div>
  );
}

export default App;
