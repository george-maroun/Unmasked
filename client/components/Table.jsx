import React from "react";
import '../style.css';

const Table = (props) => {
//   const metrics = [
//     {name: 'Ethereum', symbol: 'eth', price: '1200', amount_usd: '503', return:'23'},
//     {name: 'Polygon', symbol: 'matic', price: '3', amount_usd: '110', return:'11'}
// ];


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
          {props.metrics.map((token) => (
            <tr key={token.name}>
              <td style={{padding:".5rem .7rem"}}>{token.name}</td>
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