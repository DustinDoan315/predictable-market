// SPDX-License-Identifier: MIT
pragma solidity 0.8.27;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

contract Polymarket is ERC20, Ownable {
    address public polyToken;
    uint256 public totalMarkets = 0;

    constructor(
        address _polyToken
    ) ERC20("Julia Token", "JLT") Ownable(msg.sender) {
        polyToken = _polyToken;
    }

    mapping(uint256 => Markets) public markets;

    struct Markets {
        uint256 id;
        string market;
        uint256 timestamp;
        uint256 endTimestamp;
        address createdBy;
        string creatorImageHash;
        AmountAdded[] yesCount;
        AmountAdded[] noCount;
        uint256 totalAmount;
        uint256 totalYesAmount;
        uint256 totalNoAmount;
        bool eventCompleted;
        string description;
        string resolverUrl;
    }

    struct AmountAdded {
        address user;
        uint256 amount;
        uint256 timestamp;
    }

    mapping(address => uint256) public winningAmount;
    address[] public winningAddresses;

    event MarketCreated(
        uint256 id,
        string market,
        uint256 timestamp,
        address createdBy,
        string creatorImageHash,
        uint256 totalAmount,
        uint256 totalYesAmount,
        uint256 totalNoAmount
    );

    modifier allowedToSpend(uint256 _value) {
        require(
            _value <= ERC20(polyToken).allowance(msg.sender, address(this)),
            "Not allowed to spend this much"
        );
        _;
    }

    function createMarket(
        string memory _market,
        string memory _creatorImageHash,
        string memory _description,
        string memory _resolverUrl,
        uint256 _endTimestamp
    ) public onlyOwner {
        uint256 timestamp = block.timestamp;

        Markets storage market = markets[totalMarkets];
        market.id = totalMarkets;
        totalMarkets++;
        market.market = _market;
        market.timestamp = timestamp;
        market.createdBy = msg.sender;
        market.creatorImageHash = _creatorImageHash;
        market.totalAmount = 0;
        market.totalYesAmount = 0;
        market.totalNoAmount = 0;
        market.description = _description;
        market.resolverUrl = _resolverUrl;
        market.endTimestamp = _endTimestamp;

        emit MarketCreated(
            totalMarkets,
            _market,
            timestamp,
            msg.sender,
            _creatorImageHash,
            0,
            0,
            0
        );
    }

    function addYesBet(
        uint256 _marketId,
        uint256 _value
    ) public payable allowedToSpend(_value) {
        Markets storage market = markets[_marketId];
        ERC20(polyToken).transferFrom(msg.sender, address(this), _value);

        AmountAdded memory amountAdded = AmountAdded(
            msg.sender,
            _value,
            block.timestamp
        );

        market.totalYesAmount += _value;
        market.totalAmount += _value;
        market.yesCount.push(amountAdded);
    }

    function addNoBet(
        uint256 _marketId,
        uint256 _value
    ) public payable allowedToSpend(_value) {
        Markets storage market = markets[_marketId];
        ERC20(polyToken).transferFrom(msg.sender, address(this), _value);

        AmountAdded memory amountAdded = AmountAdded(
            msg.sender,
            _value,
            block.timestamp
        );

        market.totalNoAmount += _value;
        market.totalAmount += _value;
        market.noCount.push(amountAdded);
    }

    function getGraphData(
        uint256 _marketId
    ) public view returns (AmountAdded[] memory, AmountAdded[] memory) {
        Markets storage market = markets[_marketId];
        return (market.yesCount, market.noCount);
    }

    function distributeWinningAmount(
        uint256 _marketId,
        bool eventOutcome
    ) public onlyOwner {
        Markets storage market = markets[_marketId];
        // uint256 totalAmountToDistribute;

        // Process winning amounts based on the event outcome
        if (eventOutcome) {
            for (uint256 i = 0; i < market.yesCount.length; i++) {
                uint256 amount = (market.totalNoAmount *
                    market.yesCount[i].amount) / market.totalYesAmount;
                winningAmount[market.yesCount[i].user] += (amount +
                    market.yesCount[i].amount);
                if (!addressAlreadyStored(market.yesCount[i].user)) {
                    winningAddresses.push(market.yesCount[i].user);
                }
            }
        } else {
            for (uint256 i = 0; i < market.noCount.length; i++) {
                uint256 amount = (market.totalYesAmount *
                    market.noCount[i].amount) / market.totalNoAmount;
                winningAmount[market.noCount[i].user] += (amount +
                    market.noCount[i].amount);
                if (!addressAlreadyStored(market.noCount[i].user)) {
                    winningAddresses.push(market.noCount[i].user);
                }
            }
        }

        // Transfer the winnings to the winning addresses
        for (uint256 i = 0; i < winningAddresses.length; i++) {
            address payable winner = payable(winningAddresses[i]);
            ERC20(polyToken).transfer(winner, winningAmount[winner]);
            delete winningAmount[winner];
        }

        // Clear winning addresses and mark event as completed
        delete winningAddresses;
        market.eventCompleted = true;
    }

    function addressAlreadyStored(
        address _address
    ) private view returns (bool) {
        for (uint256 i = 0; i < winningAddresses.length; i++) {
            if (winningAddresses[i] == _address) {
                return true;
            }
        }
        return false;
    }
}
