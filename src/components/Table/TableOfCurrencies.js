import "./tableOfCurrencies.scss"
import Table from "react-bootstrap/Table";


export default function TableOfCurrencies({ tableType,curenciesStatus,colTitles}) {
        let trendDivUp = <div className="ms-2 up-trend" />;
        let trendDivDown = <div className="ms-2 down-trend" />;

    return (
        
        <Table responsive className="table mb-4">
            <thead>
                <tr>
                    {colTitles.map((colTitle,index)=>
                    <th className="text-center" key={index}>{colTitle}</th>
                    )}
                </tr>
            </thead>
            <tbody>
                {curenciesStatus.map((currency, index) =>
                    <tr key={index}>
                        <td>
                            <img
                                className="me-2 mb-1"
                                src={currency.icon}
                                width="25"
                                alt="React Bootstrap logo"
                            />
                            <span>{currency.code}</span>
                        </td>
                        {(currency.currency) && <td  className="text-center">{currency.currency}</td>}
                        {(currency.count) && <td className="text-center">{currency.count}</td>}
                        <td className="text-center">
                            {currency.sell.amount.toLocaleString()}
                            {tableType=="coin" && <span className="ms-2 currency-color">T</span>}
                            {currency.sell.trend == 'up' && trendDivUp}
                            {currency.sell.trend == 'down' && trendDivDown}
                        </td>
                        <td className="text-center">
                            {currency.buy.amount.toLocaleString()}
                            {tableType=="coin" && <span className="ms-2 currency-color">T</span>}
                            {currency.buy.trend == 'up' && trendDivUp}
                            {currency.buy.trend == 'down' && trendDivDown}
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    )
}

