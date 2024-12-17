// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BetMarket is ERC20, Ownable {
    address public polyToken;
    uint256 public totalMarkets;

    struct Bet {
        address user;
        uint256 amount;
        bool betType;
    }

    struct Market {
        uint256 id;
        uint256 endTimestamp;
        uint256 totalYesAmount;
        uint256 totalNoAmount;
        bool eventCompleted;
        Bet[] bets;
    }

    mapping(uint256 => Market) public markets;
    mapping(address => uint256) public winningAmount;
    address[] public winningAddresses;

    event MarketCreated(
        uint256 indexed id,
        uint256 timestamp,
        address indexed createdBy
    );
    event PlaceBet(
        bool betType,
        uint256 indexed marketId,
        address indexed user,
        uint256 amount
    );
    event MarketClosed(uint256 indexed marketId, bool eventOutcome);

    modifier allowedToSpend(uint256 _value) {
        require(
            _value <= ERC20(polyToken).allowance(msg.sender, address(this)),
            "Not allowed to spend this much"
        );
        _;
    }

    constructor(
        address admin,
        address _polyToken
    ) ERC20("Julia Token", "JLT") Ownable(admin) {
        polyToken = _polyToken;
    }

    function createMarket(uint256 _endTimestamp) public onlyOwner {
        uint256 marketId = totalMarkets++;
        markets[marketId].id = marketId;
        markets[marketId].endTimestamp = _endTimestamp;
        markets[marketId].totalYesAmount = 0;
        markets[marketId].totalNoAmount = 0;
        markets[marketId].eventCompleted = false;

        emit MarketCreated(marketId, block.timestamp, msg.sender);
    }

    function placeBet(
        uint256 _marketId,
        bool _betType,
        uint256 _amount
    ) public allowedToSpend(_amount) {
        Market storage market = markets[_marketId];
        require(!market.eventCompleted, "This market is completed");
        require(block.timestamp < market.endTimestamp, "Betting closed");

        ERC20(polyToken).transferFrom(msg.sender, address(this), _amount);

        // Add bet directly to storage
        market.bets.push(
            Bet({user: msg.sender, amount: _amount, betType: _betType})
        );
        if (_betType) {
            market.totalYesAmount += _amount;
        } else {
            market.totalNoAmount += _amount;
        }

        emit PlaceBet(_betType, _marketId, msg.sender, _amount);
    }

    function closeMarket(
        uint256 _marketId,
        bool eventOutcome
    ) public onlyOwner {
        Market storage market = markets[_marketId];
        require(!market.eventCompleted, "Market already completed");
        market.eventCompleted = true;

        distributeWinnings(_marketId, eventOutcome);
        emit MarketClosed(_marketId, eventOutcome);
    }

    function distributeWinnings(uint256 _marketId, bool eventOutcome) private {
        Market storage market = markets[_marketId];
        uint256 totalLosingAmount = eventOutcome
            ? market.totalNoAmount
            : market.totalYesAmount;
        uint256 totalWinningAmount = eventOutcome
            ? market.totalYesAmount
            : market.totalNoAmount;

        // Distribute winnings
        for (uint256 i = 0; i < market.bets.length; i++) {
            Bet storage currentBet = market.bets[i];
            if (currentBet.betType == eventOutcome) {
                uint256 amount = (totalLosingAmount * currentBet.amount) /
                    totalWinningAmount;
                winningAmount[currentBet.user] += amount + currentBet.amount;
                if (
                    winningAmount[currentBet.user] == amount + currentBet.amount
                ) {
                    winningAddresses.push(currentBet.user);
                }
            }
        }

        for (uint256 i = 0; i < winningAddresses.length; i++) {
            ERC20(polyToken).transfer(
                winningAddresses[i],
                winningAmount[winningAddresses[i]]
            );
            delete winningAmount[winningAddresses[i]]; // Reset after transfer
        }

        // Clear the list of winners for the next market
        delete winningAddresses;
    }

    function getMarketData(
        uint256 _marketId
    )
        public
        view
        returns (
            uint256 id,
            uint256 totalYesAmount,
            uint256 totalNoAmount,
            uint256 endTimestamp,
            bool eventCompleted
        )
    {
        Market storage market = markets[_marketId];
        return (
            market.id,
            market.totalYesAmount,
            market.totalNoAmount,
            market.endTimestamp,
            market.eventCompleted
        );
    }
}
