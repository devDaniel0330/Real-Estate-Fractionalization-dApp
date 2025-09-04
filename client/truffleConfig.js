const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  contracts_directory: './contracts',
  contracts_build_directory: './client/src/contracts',
  
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545, // Ganache
      network_id: "*"
    },
    sepolia: {
      provider: () => new HDWalletProvider(
        'YOUR_MNEMONIC', 
        'https://sepolia.infura.io/v3/YOUR_INFURA_KEY'
      ),
      network_id: 11155111,
      gas: 6000000
    }
  },
  
  compilers: {
    solc: {
      version: "0.8.19"
    }
  }
};