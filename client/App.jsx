import React from "react";
import ConnectButton from "./components/ConnectButton.jsx";
import { ethers } from "ethers";
import Metrics from "./components/Metrics.jsx";

import "./style.css";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAccount: null,
      assets: {}
    };
    this.connectToMetamask = this.connectToMetamask.bind(this);
  }

  async checkIfWalletIsConnected() {
    const { ethereum } = window;

    if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        this.connectToMetamask(account)
        
    } else {
        console.log("No authorized account found")
    }
}


  async getTokenBalances() {
    const provider = new ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/c364e7d757af43db8b6261eeb1021e0e");
    let ethBalance = await provider.getBalance(this.state.currentAccount)
    ethBalance = ethers.utils.formatEther(ethBalance);
    
    const tokenInfo = [
      {slug:'usd-coin', address:'0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', decimals:6}, 
      {slug:'matic-network', address:'0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0', decimals:18}, 
      {slug:'tether', address:'0xdAC17F958D2ee523a2206206994597C13D831ec7', decimals:6}, 
      {slug:'binancecoin', address:'0xB8c77482e45F1F44dE1745F52C74426C631bDD52', decimals:18}, 
      {slug:'uniswap', address:'0x1f9840a85d5af5bf1d1762f925bdaddc4201f984', decimals:18},
      {slug:'chainlink', address:'0x514910771af9ca656af840dff83e8264ecf986ca', decimals:18},
      {slug:'dai', address:'0x6B175474E89094C44Da98b954EedeAC495271d0F', decimals:18},
      {slug:'havven', address:'0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f', decimals:18},
      {slug:'crypto-com-chain', address:'0xA0b73E1Ff0B80914AB6fe0444E65848C4C34450b', decimals:8},
      {slug:'compound-governance-token', address:'0xc00e94cb662c3520282e6f5717214004a7f26888', decimals:18}
    ];

    const abi = ["function balanceOf(address) view returns (uint)"];
    const assets = {};
    if (ethBalance > 0) {
      assets.ethereum = ethBalance;
    }

    for (let token of tokenInfo) {
      const currTokenAddress = token.address;
      const contract = new ethers.Contract(currTokenAddress, abi, provider);
      let balance = await contract.balanceOf(this.state.currentAccount);
      balance = ethers.utils.formatUnits(balance, token.decimals);
      if (Number(balance) > 0) {
        assets[token.slug] = balance;
      }
    }
    
    this.setState({
      ...this.state,      
      assets: assets
    });
  }

  connectToMetamask(account) {
    this.setState({
      currentAccount: account
    });
  }

  componentDidUpdate() {
    if (Object.keys(this.state.assets).length === 0 && this.state.currentAccount) {
      this.getTokenBalances();
    }
    else {
      console.log(this.state);
    }
    
  }

  componentDidMount() {
    this.checkIfWalletIsConnected();
  }

  displayAccount() {
    return (
      <div className="public-key">
        Connected: {this.state.currentAccount.substring(0, 6)}...{this.state.currentAccount.substring(36)}
      </div>
    )
  }

  render() {
    return (
      <div className="app-container">
        <div>
            {this.state.currentAccount && this.displayAccount()}
        </div>
        <div className="App">
          {this.state.currentAccount === null ? <ConnectButton connectToMetamask={this.connectToMetamask}/> : <Metrics assets={this.state.assets}/>}
        </div>
      </div>
    )
  }
}

export default App;
