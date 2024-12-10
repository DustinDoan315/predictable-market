// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

interface IBetMarket {
    struct AmountAdded {
        address user;
        uint256 amount;
    }

    struct Market {
        uint256 id;
        string market;
        uint256 timestamp;
        uint256 endTimestamp;
        address createdBy;
        string creatorImageHash;
        string description;
        string resolverUrl;
        uint256 totalAmount;
        uint256 totalYesAmount;
        uint256 totalNoAmount;
        bool eventCompleted;
    }

    function createMarket(
        string memory _market,
        string memory _creatorImageHash,
        string memory _description,
        string memory _resolverUrl,
        uint256 _endTimestamp
    ) external;

    function placeBet(
        uint256 _marketId,
        bool _betType,
        uint256 _amount
    ) external;

    function closeMarket(uint256 _marketId, bool eventOutcome) external;

    function getMarketData(
        uint256 _marketId
    )
        external
        view
        returns (string memory, uint256, uint256, uint256, uint256, bool);
}
