import React from "react";
import '../style.css';
import { ethers } from "ethers";

const ConnectButton = (props) => {
  return (
    <div className="button-container">
      <p className="title">Welcome to Unmasked</p>
      <p className="subtitle">Connect your Metamask Wallet</p>
      <button 
        className="connect-wallet-button"
        onClick={() => connectWallet(props.connectToMetamask)}
      >
        Connect wallet
        </button> 
    </div>
  )
}

const connectWallet = async (connectToMetamask) => {
  try {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Get MetaMask!");
      return;
    }

    const accounts = await ethereum.request({ method: "eth_requestAccounts" });

    
    await connectToMetamask(accounts[0]);
    console.log("Connected", accounts[0]);
  } catch (error) {
    console.log(error)
  }
}

export default ConnectButton;