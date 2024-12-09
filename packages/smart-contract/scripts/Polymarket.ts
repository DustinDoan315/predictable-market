import { artifacts, ethers } from "hardhat";
const fs = require("fs");

async function main() {
  // const network = hardhatArguments.network ? hardhatArguments.network : 'dev';
  const [deployer] = await ethers.getSigners();
  const provider = ethers.provider;
  const contractName = "Polymarket";

  const deployerBalance = await provider.getBalance(deployer.address);
  console.log("deploy from address: ", deployer.address);

  console.log("Deployer balance:", ethers.formatEther(deployerBalance));

  const contractFactory = await ethers.getContractFactory(contractName);

  const tokenAddress = "0x425eea9d65f20ce7FB56D810F8fD2697c717879a";

  const contract = await contractFactory.deploy(tokenAddress, {
    gasLimit: "0x1000000",
  });
  saveFrontendFiles(contract, contractName);
  console.log("Contract deployed at: ", contract);
}

function saveFrontendFiles(contract: any, name: string) {
  const contractsDir = __dirname + "/../exportData";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + `/${name}-address.json`,
    JSON.stringify({ address: contract.target }, undefined, 2)
  );

  const contractArtifact = artifacts.readArtifactSync(name);

  fs.writeFileSync(
    contractsDir + `/${name}.json`,
    JSON.stringify(contractArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
