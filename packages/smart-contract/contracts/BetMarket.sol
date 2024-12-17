// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import {Market} from "../libraries/MarketStruct.sol";

contract BetMarket is ERC20, Ownable {
    address public polyToken;
    uint256 public totalMarkets;

    struct AmountAdded {
        address user;
        uint256 amount;
    }

    mapping(uint256 => Market) public markets;
    mapping(address => uint256) public winningAmount;
    address[] public winningAddresses;

    event MarketCreated(
        uint256 indexed id,
        string market,
        uint256 timestamp,
        address indexed createdBy,
        string creatorImageHash
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
        address _polyToken
    ) ERC20("Julia Token", "JLT") Ownable(msg.sender) {
        polyToken = _polyToken;
    }

    function createMarket(
        string memory _market,
        string memory _creatorImageHash,
        string memory _description,
        string memory _resolverUrl,
        uint256 _endTimestamp
    ) public onlyOwner {
        uint256 marketId = totalMarkets;
        totalMarkets++;

        Market storage market = markets[marketId];
        market.id = marketId;
        market.market = _market;
        market.timestamp = block.timestamp;
        market.createdBy = msg.sender;
        market.creatorImageHash = _creatorImageHash;
        market.description = _description;
        market.resolverUrl = _resolverUrl;
        market.endTimestamp = _endTimestamp;
        market.totalAmount = 0;
        market.totalYesAmount = 0;
        market.totalNoAmount = 0;
        market.eventCompleted = false;

        emit MarketCreated(
            marketId,
            _market,
            block.timestamp,
            msg.sender,
            _creatorImageHash
        );
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

        AmountAdded memory amountAdded = AmountAdded(msg.sender, _amount);
        if (_betType) {
            market.yesBets.push(amountAdded);
            market.totalYesAmount += _amount;
        } else {
            market.noBets.push(amountAdded);
            market.totalNoAmount += _amount;
        }

        market.userBets[msg.sender] += _amount;
        market.totalAmount += _amount;

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

        // Calculate winning amounts based on event outcome
        if (eventOutcome) {
            for (uint256 i = 0; i < market.yesBets.length; i++) {
                uint256 amount = (market.totalNoAmount *
                    market.yesBets[i].amount) / market.totalYesAmount;
                winningAmount[market.yesBets[i].user] +=
                    amount +
                    market.yesBets[i].amount;
                if (
                    winningAmount[market.yesBets[i].user] ==
                    amount + market.yesBets[i].amount
                ) {
                    winningAddresses.push(market.yesBets[i].user);
                }
            }
        } else {
            for (uint256 i = 0; i < market.noBets.length; i++) {
                uint256 amount = (market.totalYesAmount *
                    market.noBets[i].amount) / market.totalNoAmount;
                winningAmount[market.noBets[i].user] +=
                    amount +
                    market.noBets[i].amount;
                if (
                    winningAmount[market.noBets[i].user] ==
                    amount + market.noBets[i].amount
                ) {
                    winningAddresses.push(market.noBets[i].user);
                }
            }
        }

        // Transfer winnings
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
        returns (string memory, uint256, uint256, uint256, uint256, bool)
    {
        Market storage market = markets[_marketId];
        return (
            market.market,
            market.totalAmount,
            market.totalYesAmount,
            market.totalNoAmount,
            market.endTimestamp,
            market.eventCompleted
        );
    }
}
