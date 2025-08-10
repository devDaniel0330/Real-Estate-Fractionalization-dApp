import React, { useState } from 'react';
import Web3 from 'web3';
import PropertyToken from '../abi/PropertyToken.json';

const BuyTokens = () => {
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');

  const contractAddress = "0x8059B0AE35c113137694Ba15b2C3585aE77Bb8E9";

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

  return (
    <div>
      <h2>Buy Property Tokens</h2>
      <input type="number" placeholder="Enter number of tokens" value={amount} onChange={e => setAmount(e.target.value)} />
      <button onClick={handleBuy}>Buy</button>
      <p>{status}</p>
    </div>
  )
};

export default BuyTokens;