require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || "";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },

  networks: {
    // Hardhat Network bawaan (untuk testing)
    hardhat: {
      chainId: 1337,
    },

    // Local node (npx hardhat node)
    localhost: {
      url: "http://127.0.0.1:8546",
      chainId: 1337,
    },

    // Ganache (alternatif GUI)
    ganache: {
      url: "http://127.0.0.1:7545",
      chainId: 1337,
    },

    // Sepolia Testnet
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 11155111,
    },
  },

  // Gas reporter (opsional, muncul saat npx hardhat test)
  gasReporter: {
    enabled: true,
    currency: "USD",
  },
};
