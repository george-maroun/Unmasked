import React from "react";
import '../style.css';

const Table = (props) => {

// get data: [{name: 'Ethereum', symbol: 'eth', price: '1200', amount_usd: '5032', 1y_return:'23'}, ...]
  if (props.metrics) {
  return (
    <div>
      <b>Summary</b>
      <table>
        <thead>
          <tr className="table-header">
            <th>Name</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>Amount USD</th>
            <th>1Y Return</th>
          </tr>
        </thead>
        <tbody>
          {props.metrics.map((token, i) => (
            <tr key={token.name}>
              <td style={{padding:".5rem .7rem"}}><a target="_blank" href={"https://www.coingecko.com/en/coins/" + Object.keys(props.assets)[i]}>{token.name}</a></td>
              <td>{token.symbol.toUpperCase()}</td>
              <td>${token.price}</td>
              <td>${token["amount_usd"]}</td>
              <td>{token['1y_return']}%</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  )
}
}

export default Table;