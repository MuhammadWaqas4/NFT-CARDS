
import './app.css'
import React, { useState, useEffect } from 'react';
import {
  contractAddress,
  contractabi,
  tokenAddress, tokenabi
} from './constants/constants';
import Web3 from "web3";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const [walletaddress, setWalletAddress] = useState('Connect')
  const [token, setToken] = useState('token')


  const [walletvalue, setWalletValue] = useState("connect wallet")
  const [balance, setBalance] = useState("token");
  const [ticket, setticketBalance] = useState("nft");
  const [inputval, setInputVal] = useState()
  let accountAd;
  let oraclerate;
  let supplytotal;
  let blocktimestamp;
  const [accountbalance, setaccountbalance] = useState("Connect Wallet");

  const loadWeb3 = async () => {
    let isConnected = false;
    try {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        isConnected = true;
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
        isConnected = true;
      } else {
        isConnected = false;
        console.log("Metamask is not installed, please install it on your browser to connect.");
        alert("Metamask is not installed, please install it on your browser to connect.");
      }
      if (isConnected === true) {
        let accounts = await getAccounts();
        // setAccount(accounts[0]);
        accountAd = accounts[0];
        setWalletValue(accounts[0]);
        getData();
        // getMasterData();

        let accountDetails = null;
        window.ethereum.on("accountsChanged", function (accounts) {
          // setAccount(accounts[0]);
          accountAd = accounts[0];

          setWalletValue(accounts[0]);
          // console.log(accounts);
        });
      }
    } catch (error) {
      console.log("Error while connecting metamask", error);
      // alert("Error while connecting metamask");
    }
  };


  const getAccounts = async () => {
    const web3 = window.web3;
    try {
      let accounts = await web3.eth.getAccounts();
      console.log(accounts);
      return accounts;
    } catch (error) {
      console.log("Error while fetching acounts: ", error);
      return null;
    }
  };

  // eslint-disable-next-line
  const isLockedAccount = async () => {
    try {
      let accounts = await getAccounts();
      if (accounts.length > 0) {
        console.log("Metamask is unlocked");
      } else {
        console.log("Metamask is locked");
      }
    } catch (error) {
      alert("Error while checking locked account");
    }
  };

  const getData = async () => {
    try {
      console.log("contract", "getData");
      const web3 = window.web3;
      let tokencontract = new web3.eth.Contract(tokenabi, tokenAddress);
      console.log("contract", tokencontract);
      let balancce = await tokencontract.methods.balanceOf(accountAd).call();
      setBalance(balancce / 10 ** 9);
      console.log("contract", balancce);

      let contract = new web3.eth.Contract(contractabi, contractAddress);
      console.log("contract", contract);
      balancce = await contract.methods.balanceOf(accountAd).call();
      setticketBalance(balancce);
    } catch (e) {
      console.log("error", e);
    }
  };

  const buyTicket = async () => {
    try {

      // console.log("accountDetails", referral);
      const web3 = window.web3;
      let contract = new web3.eth.Contract(contractabi, contractAddress);
      let tokencontract = new web3.eth.Contract(tokenabi, tokenAddress);

      console.log("input", contract);
      console.log("input", tokencontract);
      console.log("input", contractAddress);
      console.log("input", inputval);
      console.log("input", walletvalue);

      let tokens = await tokencontract.methods
        .approve(contractAddress, inputval * 10 ** 10)
        .send({
          from: walletvalue,
          gasLimit: 2100000,
        })
        .on("transactionHash", async (hash) => {
          console.log("input", "Your transaction is pending")
        })
        .on("receipt", async (receipt) => {
          console.log("input", "Your transaction is confirmed", receipt);

          let accountDetails = await contract.methods
            .buynft(inputval)
            .send({
              from: walletvalue,
              gasLimit: 2100000,
            })
            .on("transactionHash", async (hash) => {
              console.log("input", "Your transaction is pending")
              toast.info("Your Transaction is Pending..")
            })
            .on("receipt", async (receipt) => {
              console.log("input", "Your transaction is confirmed", receipt);
              toast.success("Your Transaction is confirmed")
            })
            .on("error", async (error) => {
              console.log("input", "User denied transaction", error);
              toast.error("Error !")
            });

        })
        .on("error", async (error) => {
          console.log("input", "User denied transaction", error);
        });

    } catch (e) {
      console.log("error", e)
      console.log("error", e.mesage);
    }
  }
  useEffect(() => {
    setInterval(() => {
      // loadWeb3();
    }, 1500);
  }, []);

  return (
    <>
      <div className="Main_Div">
        <div className="Nav_header_Main">
          <div className="Nav_header">
            <div className="navMain">
              <h2>BEABULL LOTTERY</h2>
              <button onClick={loadWeb3} className="connectButton text-truncate">{walletvalue} </button>
            </div>
            <div className="Bbull_balance">
              <h4 className="Bbull_balance_h4_1">$BBULL Balance:</h4>
              <h4 className="Bbull_balance_h4_2">56000</h4>
            </div>
          </div>
        </div>
        <div className="Bbull_cards_main">
          <div className="Bbull_cards">
            <h2>Lottery-1</h2>
            {/* <h3>Balance of ticket = 1 Ticket</h3>
            <h3>{`Balance of erc20 = ${token}`}</h3> */}
            <div className="Bbull_balance">
              <h4 className="Bbull_balance_h4_1">Balance of ticket</h4>
              <h4 className="Bbull_balance_h4_2">{ticket}</h4>
            </div>
            <div className="Bbull_balance">
              <h4 className="Bbull_balance_h4_1">Balance of erc20</h4>
              <h4 className="Bbull_balance_h4_2">{balance}</h4>
            </div>
            <h3>Price of Ticket</h3>
            <h2>Buy Lottery Ticket</h2>
            <div className="inpo_div">
              {/* <input type="text" placeholder="No of Tickets..." /> */}
              <button onClick={buyTicket} className="buyTicket_Button ">Buy Ticket</button>
            </div>
          </div>
          <div className="Bbull_cards">
            <h2>Lottery-2</h2>
            <h3 className="cSoon_w">Comming Soon</h3>
          </div>
          <div className="Bbull_cards">
            <h2>Lottery-3</h2>
            <h3 className="cSoon_w">Comming Soon</h3>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
