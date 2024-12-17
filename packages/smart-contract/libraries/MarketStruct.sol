// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

struct AmountAdded {
    address user;
    uint256 amount;
}

struct Market {
    uint256 salt;
    uint256 tokenId;
    address maker;
    uint256 totalAmount;
    uint256 totalBuyAmount;
    uint256 totalSellAmount;
    uint256 expiration;
    uint256 feeRateBps;
    bool eventCompleted;
    Side side;
}

struct Order {
    uint256 salt;
    address maker;
    address signer;
    address taker;
    uint256 tokenId;
    uint256 makerAmount;
    uint256 takerAmount;
    uint256 expiration;
    uint256 nonce;
    uint256 feeRateBps;
    Side side;
    SignatureType signatureType;
    bytes signature;
}

enum Side {
    BUY,
    SELL
}
enum SignatureType {
    EOA,
    POLY_PROXY,
    POLY_GNOSIS_SAFE
}

enum MatchType {
    // 0: buy vs sell
    COMPLEMENTARY,
    // 1: both buys
    MINT,
    // 2: both sells
    MERGE
}

struct OrderStatus {
    bool isFilledOrCancelled;
    uint256 remaining;
}
