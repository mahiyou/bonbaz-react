import "./tableOfCoins.scss"
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { ICoin } from "../../interfaces.ts"

type Props = {
    coinsStatus: ICoin[];
    colTitles: string[]
}

export default function TableOfCoins({ coinsStatus, colTitles } : Props) {

    return (
        <Table responsive className="table mb-4">
            <thead>
                <tr>
                    {colTitles.map((colTitle, index) =>
                        <th className="text-center" key={index}>{colTitle}</th>
                    )}
                </tr>
            </thead>
            <tbody>
                {coinsStatus.map((currency, index) =>
                    <tr key={index}>
                        <td>
                            <img
                                className="me-2 mb-1"
                                src={`/imgs/currencies/coin.svg`}
                                width="23"
                                alt="flag"/>
                            <span>{(currency.name).charAt(0).toUpperCase() + (currency.name).slice(1)}</span>
                        </td>
                        <td className="text-center">
                            {currency.price_sell.toLocaleString()}
                            <span className="ms-2 currency-color">T</span>
                            {(parseInt(currency.price_sell) > parseInt(currency.history[currency.history.length - 1].price_sell)) && <div className="ms-2 up-trend" />}
                            {(parseInt(currency.price_sell) < parseInt(currency.history[currency.history.length - 1].price_sell)) && <div className="ms-2 down-trend" />}
                        </td>
                        <td className="text-center">
                            {currency.price_buy.toLocaleString()}
                            <span className="ms-2 currency-color">T</span>
                            {(parseInt(currency.price_buy) > parseInt(currency.history[currency.history.length - 1].price_buy)) && <div className="ms-2 up-trend" />}
                            {(parseInt(currency.price_buy) < parseInt(currency.history[currency.history.length - 1].price_buy)) && <div className="ms-2 down-trend" />}
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    )
}