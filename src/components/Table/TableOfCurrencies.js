import "./tableOfCurrencies.scss"
import Table from "react-bootstrap/Table";


export default function TableOfCurrencies({ curenciesStatus }) {
        let trendDivUp = <div className="ms-2 up-trend" />;
        let trendDivDown = <div className="ms-2 down-trend" />;

    return (
        
        <Table responsive className="table mb-4">
            {console.log(curenciesStatus)}
            <thead>
                <tr>
                    <th className="text-center">Code</th>
                    <th >Currency</th>
                    <th className="text-center">count</th>
                    <th className="text-center">sell</th>
                    <th className="text-center">buy</th>
                </tr>
            </thead>
            <tbody>
                {curenciesStatus.map((currency, index) =>
                    <tr key={index}>
                        <td className="text-center">
                            <img
                                className="me-2 mb-1"
                                src={currency.icon}
                                width="23"
                                alt="React Bootstrap logo"
                            />
                            <span>{currency.code}</span>
                        </td>
                        <td >{currency.currency}</td>
                        <td className="text-center">{currency.count}</td>
                        <td className="text-center">
                            {currency.sell.amount}
                            {currency.sell.trend == 'up' && trendDivUp}
                            {currency.sell.trend == 'down' && trendDivDown}
                        </td>
                        <td className="text-center">
                            {currency.buy.amount}
                            {currency.buy.trend == 'up' && trendDivUp}
                            {currency.buy.trend == 'down' && trendDivDown}
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    )
}

