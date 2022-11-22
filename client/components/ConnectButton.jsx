import React from "react";
import '../style.css';

const ConnectButton = () => {
  return (
    <div className="button-container">
      <p className="title">Welcome to Unmasked</p>
      <p className="subtitle">Connect your Metamask Wallet</p>
      <button 
        className="connect-wallet-button"
        onClick={connectWallet}
      >
        Connect wallet
        </button> 
    </div>
  )
}

const connectWallet = async () => {
  try {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Get MetaMask!");
      return;
    }

    const accounts = await ethereum.request({ method: "eth_requestAccounts" });

    console.log("Connected", accounts[0]);
    setCurrentAccount(accounts[0]);

    // Setup listener! This is for the case where a user comes to our site
    // and connected their wallet for the first time.
    setupEventListener() 
  } catch (error) {
    console.log(error)
  }
}

export default ConnectButton;