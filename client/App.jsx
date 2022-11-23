import React from "react";
import ConnectButton from "./components/ConnectButton.jsx";
import { ethers } from "ethers";
import Metrics from "./components/Metrics.jsx";

import "./style.css";

// const provider = new ethers.providers.JsonRpcProvider();
// await provider.getBlockNumber()
// balance = await provider.getBalance("ethers.eth")
// ethers.utils.formatEther(balance)
// ethers.utils.parseEther("1.0")

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAccount: null,
      assets: {}
    };
    this.connectToMetamask = this.connectToMetamask.bind(this);
  }


  async getTokenBalances() {
    const provider = new ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/c364e7d757af43db8b6261eeb1021e0e");
    // await provider.getBlockNumber()
    let balance = await provider.getBalance(this.state.currentAccount)
    balance = ethers.utils.formatEther(balance)
    // ethers.utils.parseEther("1.0")
   // const newAssets = {eth: 'balance'}
    this.setState({
      ...this.state,      
      assets: {eth: balance}
    });

    // console.log(this.state);
    // console.log('hi');
  }

  

  connectToMetamask(account) {
    this.setState({
      currentAccount: account
    });
  }

  componentDidUpdate() {
    //onsole.log(this.state.assets);
    if (Object.keys(this.state.assets).length === 0) {
     //if (this.state.assets.eth === null) {
      //console.log('hi')
      this.getTokenBalances();
    }
    else {
      console.log(this.state);
    }
    
  }

  displayAccount() {
    return (
      <div style={{color:'white'}}>Connected: {this.state.currentAccount.substring(0, 6)}...{this.state.currentAccount.substring(36)}</div>
    )
  }

  render() {
    return (
      <div className="app-container">
        <div className="public-key">
            {this.state.currentAccount && this.displayAccount()}
        </div>
        <div className="App">
          {this.state.currentAccount === null ? <ConnectButton connectToMetamask={this.connectToMetamask}/> : <Metrics/>}
          
        </div>
      </div>
    )
  }
}

export default App;

// https://api.etherscan.io/api?module=account&action=balance&address=0x3e5fb26fFed4653de14132f08a4385C4e2eA1Ed1&tag=latest&apikey=W72XDZDRG4FAI5W2UM6M4SI3AXJGQMGK35