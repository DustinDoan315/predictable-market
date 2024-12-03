import { ethers } from "hardhat";

async function main() {
  // const network = hardhatArguments.network ? hardhatArguments.network : 'dev';
  const [deployer] = await ethers.getSigners();
  const provider = ethers.provider;

  const deployerBalance = await provider.getBalance(deployer.address);
  console.log("deploy from address: ", deployer.address);

  console.log("Deployer balance:", ethers.formatEther(deployerBalance));

  const contractFactory = await ethers.getContractFactory("Polymarket");

  const tokenAddress = "0x425eea9d65f20ce7FB56D810F8fD2697c717879a";

  const contract = await contractFactory.deploy(tokenAddress, {
    gasLimit: "0x1000000",
  });

  console.log("Contract deployed at: ", contract);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
