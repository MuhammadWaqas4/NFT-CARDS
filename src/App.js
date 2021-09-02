import { useState } from 'react'
import './app.css'

function App() {
  const [walletaddress,setWalletAddress]=useState('Connect')
  const [token,setToken]=useState('token')
  return (
    <>
      <div className="Main_Div">
        <div className="Nav_header_Main">
          <div className="Nav_header">
            <div className="navMain">
              <h2>BEABULL LOTTERY</h2>
              <button onClick={()=>setWalletAddress("0xFf6C5eB224716bBc05295D6a2A43F1Ae8C4ad9b0")} className="connectButton text-truncate">{walletaddress}</button>
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
              <h4 className="Bbull_balance_h4_2">1 Ticket</h4>
            </div>
            <div className="Bbull_balance">
              <h4 className="Bbull_balance_h4_1">Balance of erc20</h4>
              <h4 className="Bbull_balance_h4_2">{token}</h4>
            </div>
            <h3>Price of Ticket</h3>
            <h2>Buy Lottery Ticket</h2>
            <div className="inpo_div">
              <input type="text" placeholder="No of Tickets..." />
              <button className="buyTicket_Button ">Buy Ticket</button>
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
