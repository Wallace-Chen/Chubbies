const HDWalletProvider = require("truffle-hdwallet-provider");
const web3 = require("web3");
const MNEMONIC = ""; 
const NODE_API_KEY = ""; 
const isInfura = !!process.env.INFURA_KEY;
const FACTORY_CONTRACT_ADDRESS = process.env.FACTORY_CONTRACT_ADDRESS;
const OWNER_ADDRESS = ""; 
const NETWORK = "rinkeby";

if (!MNEMONIC || !NODE_API_KEY || !OWNER_ADDRESS || !NETWORK) {
  console.error(
    "Please set a mnemonic, Alchemy/Infura key, owner, network, and contract address."
  );
  return;
}

const panda_punk = require('../build/contracts/PandaPunk.json'); 


async function main() {
  const network =
    NETWORK === "mainnet" || NETWORK === "live" ? "mainnet" : "rinkeby";
  const provider = new HDWalletProvider(
    MNEMONIC,
    "https://eth-" + network + ".alchemyapi.io/v2/" + NODE_API_KEY
  );
  const web3Instance = new web3(provider);

  if (panda_punk) {
    const nftContract = new web3Instance.eth.Contract(
      panda_punk.abi,
      panda_punk.networks[4].address,
      { gasLimit: "1000000" }
    );
	console.log(nftContract)

//   const result = await nftContract.methods.startSale().send({ from: OWNER_ADDRESS });
   const result = await nftContract.methods.adoptPandaPunk(1).send({ from: OWNER_ADDRESS, value:web3.utils.toWei("0.02", "ether") });

   console.log("Transaction finished. Tx  Hash: " + result.transactionHash);
  } else {
    console.error(
      "Add NFT_CONTRACT_ADDRESS or FACTORY_CONTRACT_ADDRESS to the environment variables"
    );
  }
}

main();

