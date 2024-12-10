// SPDX-License-Identifier: MIT
pragma solidity <0.9.0;

import {IFees} from "../interfaces/IFees.sol";

abstract contract Fees is IFees {
    uint256 fee = 1000;

    function getFee() public view override returns (uint256) {
        return fee;
    }

    function setFee(uint256 _fee) external override {
        fee = _fee;
    }
}
