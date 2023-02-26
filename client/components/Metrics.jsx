import React from "react";
import '../style.css';
import PieChart from "./PieChart.jsx";
import Table from "./Table.jsx";
import TotalValue from "./TotalValue.jsx";

class Metrics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      metricsArr: [],
      value: null
    };
  }


  async getApiData() {
    console.log(this.props.assets)
    const metricsArray = [];
    // loop over assets
    for (let asset in this.props.assets) {
      // declare obj
      const obj = {};
      // fetch from coingecko: name, symbol, price, amount_usd = Number(assets[asset]) * price
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/${asset}`);
      const data = await res.json();
      try {
        obj.name = data.name;
        obj.symbol = data.symbol;
        obj.price = Math.round(data["market_data"]["current_price"]["usd"] * 100) / 100;
        // Remove decimals
        obj["amount_usd"] = parseInt((Number(this.props.assets[asset]) * Number(data["market_data"]["current_price"]["usd"])));
        obj["1y_return"] = parseInt(data["market_data"]["price_change_percentage_1y"]) //parseInt(data["market_data"]["price_change_percentage_1y"]).toString;
      }
      catch(e) {
        console.log(e);
      }
      // push obj to array
      
      metricsArray.push(obj);

      metricsArray.sort((a,b) => b["1y_return"] - a["1y_return"]);
      console.log(metricsArray);

      this.setState({
        ...this.state,      
        metricsArr: metricsArray
      });
    }
    
  }

  componentDidUpdate() {
    if (this.state.metricsArr.length === 0) {
      this.getApiData();
    } 

    let val = 0;
    
    this.state.metricsArr.forEach((token) => {
      val += token["amount_usd"];
    })

    if (this.state.value !== val) {
      this.setState({
        ...this.state,      
        value: val
      });
    } 
    

    console.log(this.state);
  }

  render() {
    return (
      <div>
        <div className="small-title">UnMasked</div>
        <div className="metrics-container">
          <div className="top-chunk">
            <div className="metric">
              <PieChart value={this.state.value} metrics={this.state.metricsArr}/>
            </div>
            <div className="metric">
              <TotalValue value={this.state.value}/>
            </div>
          </div>
          <div className="metric">
            <Table assets={this.props.assets} metrics={this.state.metricsArr}/>
          </div>
        </div>
      </div>
    )
  }
}

export default Metrics;
