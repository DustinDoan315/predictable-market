// SPDX-License-Identifier: MIT
pragma solidity <0.9.0;

import {IFees} from "../interfaces/IFees.sol";

abstract contract Fees is IFees {
    uint256 internal constant MAX_FEE_RATE_BIPS = 1000;

    /// @notice Returns the maximum fee rate for an order
    function getMaxFeeRate() public pure override returns (uint256) {
        return MAX_FEE_RATE_BIPS;
    }
}
