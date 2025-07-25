import { BrowserProvider, Contract } from 'ethers';
import contractABI from './authABI.json';

const contractAddress = '0xd2a5bC10698FD955D1Fe6cb468a17809A08fd005';

const getContract = () => {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed");
  }

  const provider = new BrowserProvider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new Contract(contractAddress, contractABI, signer);

  return contract;
};

export default getContract;
