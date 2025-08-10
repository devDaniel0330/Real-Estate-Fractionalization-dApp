/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    // Local Hardhat node
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    // Example public testnet (Sepolia). Set RPC_URL and PRIVATE_KEY in .env
    sepolia: {
      url: process.env.RPC_URL || "",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
    }
  }
};
