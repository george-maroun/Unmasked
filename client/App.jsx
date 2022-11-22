import React from "react";
import ConnectButton from "./components/ConnectButton.jsx";
import { ethers } from "ethers";

import "./style.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {connected: false};
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
        setCurrentAccount(account)
        
        // Setup listener! This is for the case where a user comes to our site
        // and ALREADY had their wallet connected + authorized.
        setupEventListener()
    } else {
        console.log("No authorized account found")
    }
}


  connectToMetamask() {
    this.setState({
      connected: true
    });
    alert(this.state.connected)
  }

  render() {
    return (
      <div className="App">
        <ConnectButton connectToMetamask={this.connectToMetamask}/>
      </div>
    )
  }
}

export default App;