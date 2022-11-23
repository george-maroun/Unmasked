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
    } else {
        console.log("We have the ethereum object", ethereum);
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        connectToMetamask(account)
        
    } else {
        console.log("No authorized account found")
    }
}


  async getTokenBalances() {
    const provider = new ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/c364e7d757af43db8b6261eeb1021e0e");
    let balance = await provider.getBalance(this.state.currentAccount)
    balance = ethers.utils.formatEther(balance)
    this.setState({
      ...this.state,      
      assets: {
        'ethereum': balance,
        'usd-coin': '700',
        'matic-network': '150',
        'gmx': '12'
      }
    });
  }

  connectToMetamask(account) {
    this.setState({
      currentAccount: account
    });
  }

  componentDidUpdate() {
    if (Object.keys(this.state.assets).length === 0) {
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
