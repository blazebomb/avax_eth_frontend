import React, { useState } from "react";
import Web3 from "web3";
import ContractABI from "./ContractABI.json";
import "./App.css";

function App() {
  const [message, setGreeting] = useState("");
  const web3 = new Web3(window.ethereum);
  const RemixContract = new web3.eth.Contract(
    ContractABI,
    "0x481E66fdE9f1203d2B91d181751285c1C24830A7"
  );

  const setData = async (e) => {
    e.preventDefault();
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      const gas = await RemixContract.methods.setGreeting(message).estimateGas();
      const result = await RemixContract.methods
        .setGreeting(message)
        .send({ from: account, gas });
      console.log(result);
    } catch (error) {
      console.error("Error setting message:", error);
    }
  };

  const getDefaultData = async () => {
    try {
      const defaultMsg = await RemixContract.methods.defaultGreeting().call();
      setGreeting(defaultMsg); 
    } catch (error) {
      console.error("Error getting default message:", error);
    }
  };
  

  const getData = async () => {
    try {
      const currentMessage = await RemixContract.methods.getGreeting().call();
      setGreeting(currentMessage);
    } catch (error) {
      console.error("Error getting message:", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
      <h1>Greeting App</h1> 
        <form onSubmit={setData}>
          <label>
            Enter to Set Greeting:
            <input
            type="text"
            name="message"
            value={JSON.stringify(message)}
            onChange={(e) => setGreeting(JSON.parse(e.target.value))}
/>
          </label>
          <input type="submit" value="Set Greeting" />
        </form>
        <br />
        <button onClick={getData} type="button">
          Get Greeting
        </button>
        <button onClick={getDefaultData} type="button">
          Get Default Greeting
        </button>
      </header>
    </div>
  );
}

export default App;