import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import PropertyToken from '../../contracts/PropertyToken.json';
import PropertyTokenFactory from '../../contracts/PropertyTokenFactory.json';
import styles from './BuyTokens.module.css';

const BuyTokens = () => {
  const [web3, setWeb3] = useState(null);
  const [factory, setFactory] = useState(null);
  const [account, setAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');

  const contractAddress = "0x7874d94b8f9E2a28FCceCE404666C984f33a82b8";

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3Instance.eth.getAccounts();

        setWeb3(web3Instance);
        setAccount(accounts[0]);

        // Connect to factory contract if it exists
        if (PropertyTokenFactory.networks && PropertyTokenFactory.networks[5777]) {
          const factoryInstance = new web3Instance.eth.Contract(
            PropertyTokenFactory.abi,
            PropertyTokenFactory.networks[5777].address
          );
          setFactory(factoryInstance);
        }
      }
    };

    initWeb3();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent form from refreshing the page
    await handleBuy();
  };

  const handleBuy = async () => {
    if (!amount || isNaN(amount) || parseInt(amount) <= 0) {
      setStatus('Please enter a valid token amount');
      return;
    }

    try {
      if (typeof window.ethereum === 'undefined') {
        setStatus('MetaMask is not installed');
        return;
      }

      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await web3.eth.getAccounts();

      const contract = new web3.eth.Contract(
        PropertyToken.abi,
        contractAddress
      );

      const pricePerToken = await contract.methods.pricePerToken().call();
      const totalPrice = web3.utils.toBN(pricePerToken).mul(web3.utils.toBN(amount));

      await contract.methods.buyTokens(amount).send({
        from: accounts[0],
        value: totalPrice.toString()
      });

      setStatus(`successfully bought ${amount} tokens`);
    } catch (err) {
      setStatus(`Error: ${err.message}`);
    }
  };

  // Add this function to your BuyTokens component to debug
  const debugContract = async () => {
    try {
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();

      const contract = new web3.eth.Contract(
        PropertyToken.abi,
        contractAddress
      );

      console.log('Contract ABI methods:', contract.methods);

      // Test if functions exist
      if (contract.methods.pricePerToken) {
        console.log('pricePerToken function exists');
      } else {
        console.log('pricePerToken function NOT found');
      }

      if (contract.methods.buyTokens) {
        console.log('buyTokens function exists');
      } else {
        console.log('buyTokens function NOT found');
      }

      // Test calling pricePerToken
      try {
        const price = await contract.methods.pricePerToken().call();
        console.log('Price per token:', price);
      } catch (error) {
        console.log('Error calling pricePerToken:', error.message);
      }

      // Test calling getAvailableTokens
      try {
        const available = await contract.methods.getAvailableTokens().call();
        console.log('Available tokens:', available);
      } catch (error) {
        console.log('Error calling getAvailableTokens:', error.message);
      }

    } catch (error) {
      console.log('Debug error:', error);
    }
  };

  // Add this button to your JSX temporarily
  <button onClick={debugContract}>Debug Contract</button>

  return (
    <div className={styles.buyTokens}>
      <h2>Buy Property Tokens</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="amount">Amount:</label>
        <input type="number" placeholder="Enter number of tokens" value={amount} onChange={e => setAmount(e.target.value)} />
        <button onClick={handleBuy} className={styles.button}>Buy</button>
        <p className="status">{status}</p>
      </form>
    </div>
  )
};

export default BuyTokens;