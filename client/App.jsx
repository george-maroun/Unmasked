import React from "react";
import ConnectButton from "./components/ConnectButton.jsx";
import { ethers } from "ethers";
import Metrics from "./components/Metrics.jsx";

import "./style.css";

// 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
// const provider = new ethers.providers.JsonRpcProvider();
// const usdcAddress = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
// const usdcAbi = ["function balanceOf(address) view returns (uint)"];

// const usdcContract = new ethers.Contract(usdcAddress, usdcAbi, provider);
// usdcBalance = await daiContract.balanceOf("0x3e5fb26fFed4653de14132f08a4385C4e2eA1Ed1")

// ethers.utils.formatUnits(usdcBalance, 18)




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
    let balance = await provider.getBalance(this.state.currentAccount)
    balance = ethers.utils.formatEther(balance)


    const usdcAddress = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
    const usdcAbi = ["function balanceOf(address) view returns (uint)"];

    const usdcContract = new ethers.Contract(usdcAddress, usdcAbi, provider);
    let usdcBalance = await usdcContract.balanceOf("0x3e5fb26fFed4653de14132f08a4385C4e2eA1Ed1")
    // console.log("USDC", usdcBalance/1000000)
    usdcBalance = usdcBalance/1000000
    // usdcBalance = ethers.utils.formatUnits(usdcBalance, 16)
    
    this.setState({
      ...this.state,      
      assets: {
        'ethereum': balance,
        'usd-coin': usdcBalance,
        'matic-network': '150',
        'lido-dao': '300'
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
