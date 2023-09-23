import "./tableOfCurrencies.scss"
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { ICurrency } from "../../interfaces.ts"

type Props = {
    curenciesStatus: ICurrency[];
    colTitles: string[]
}


export default function TableOfCurrencies({ curenciesStatus, colTitles }: Props) {

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
                {curenciesStatus.map((currency, index) =>
                    <tr key={index}>
                        <td>
                            <span className={`mx-2 rounded-1 fi fi-${currency.code.slice(0, 2)}`}></span>
                            <span>{(currency.code).toUpperCase()}</span>
                        </td>
                        <td className="text-center">
                            {currency.count != 1 &&
                                <Badge className="badge bg-transparent text-customRed">{currency.count}</Badge>
                            }
                            {currency.name}
                        </td>
                        <td className="text-center">
                            {currency.price_sell.toLocaleString()}
                            {(parseInt(currency.price_sell) > parseInt(currency.history[currency.history.length - 1].price_sell)) && <div className="ms-2 up-trend" />}
                            {(parseInt(currency.price_sell) < parseInt(currency.history[currency.history.length - 1].price_sell)) && <div className="ms-2 down-trend" />}
                        </td>
                        <td className="text-center">
                            {currency.price_buy.toLocaleString()}
                            {(parseInt(currency.price_buy) > parseInt(currency.history[currency.history.length - 1].price_buy)) && <div className="ms-2 up-trend" />}
                            {(parseInt(currency.price_buy) < parseInt(currency.history[currency.history.length - 1].price_buy)) && <div className="ms-2 down-trend" />}
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    )
}