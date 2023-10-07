//import React from "react";
import PropTypes from 'prop-types';
import Web3 from "web3";
import ABI from "./ABI.json";
import { useNavigate } from 'react-router-dom';

const Wallet = ({ saveState }) => {
  const navigateTo = useNavigate();
  const connectwallet = async () => {
    try {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts"
        });

        const contractAddress = "0xbec24e5abd6daa586ceb4ec18bf4d94b6bc0bbcc";
        const contract = new web3.eth.Contract(ABI, contractAddress);
        saveState({ web3: web3, contract: contract, account: accounts[0] })
        navigateTo("/view-all-tasks")
      } else {
        throw new Error("Ethereum provider not available.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="wallet_header">
        <span>Welcome To</span> <p>TODO 3.0</p>
      </div>
      <div className='connect_wallet_section todo_btn'>
        <p>Please Connect Metamask Wallet To Access The App</p>
        <button onClick={() => connectwallet()}>Connect Wallet</button>
      </div>
    </>
  );
};

Wallet.propTypes = {
  saveState: PropTypes.func.isRequired,
};

export default Wallet;
