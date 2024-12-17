import { ethers } from "hardhat";
import { expect } from "chai";
import { BetMarket, MockERC20 } from "../typechain-types";

describe("BetMarket", function () {
  let betMarket: BetMarket;
  let polyToken: MockERC20;
  let owner: any;
  let addr1: any;
  let addr2: any;
  let addr3: any;

  beforeEach(async function () {
    // Deploy ERC20 token for testing
    const MockERC20 = await ethers.getContractFactory("MockERC20");
    polyToken = (await MockERC20.deploy("0x00", "POLY")) as MockERC20;
    await polyToken.waitForDeployment();

    // Distribute some tokens to addr1 and addr2
    [owner, addr1, addr2, addr3] = await ethers.getSigners();
    await polyToken.mint(addr1.address, ethers.parseEther("1000"));
    await polyToken.mint(addr2.address, ethers.parseEther("1000"));
    await polyToken.mint(addr3.address, ethers.parseEther("1000"));

    // Deploy BetMarket contract
    const BetMarketFactory = await ethers.getContractFactory("BetMarket");
    betMarket = (await BetMarketFactory.deploy(
      owner.address,
      await polyToken.getAddress()
    )) as BetMarket;
    await betMarket.waitForDeployment();
  });

  it("Should allow the owner to create a market", async function () {
    await betMarket.createMarket(1735689600);
    const marketData = await betMarket.getMarketData(0);

    expect(marketData.endTimestamp).to.equal(1735689600);
  });

  it("Should allow users to place bets and resolve matches", async function () {
    // Approve and place bets
    await polyToken
      .connect(addr1)
      .approve(betMarket.target, ethers.parseEther("100"));
    await polyToken
      .connect(addr2)
      .approve(betMarket.target, ethers.parseEther("100"));

    await betMarket.createMarket(1735689600);

    await betMarket.connect(addr1).placeBet(0, true, ethers.parseEther("50"));
    await betMarket.connect(addr2).placeBet(0, false, ethers.parseEther("50"));

    // Close market and resolve
    await betMarket.closeMarket(0, true);

    // Check winning amounts
    const addr1BalanceAfter = await polyToken.balanceOf(addr1.address);
    const addr2BalanceAfter = await polyToken.balanceOf(addr2.address);

    expect(addr1BalanceAfter).to.equal(ethers.parseEther("1050"));
    expect(addr2BalanceAfter).to.equal(ethers.parseEther("950"));
  });

  it("Should not allow non-owner to create markets or close them", async function () {
    await expect(betMarket.connect(addr1).createMarket(1735689600))
      .to.be.revertedWithCustomError(betMarket, "OwnableUnauthorizedAccount")
      .withArgs(addr1.address);
    await betMarket.createMarket(1735689600);

    await expect(betMarket.connect(addr1).closeMarket(0, true))
      .to.be.revertedWithCustomError(betMarket, "OwnableUnauthorizedAccount")
      .withArgs(addr1.address);
  });
});
