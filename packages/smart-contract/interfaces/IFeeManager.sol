// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

interface IFeeManager {
    function getPlatformFee() external view returns (uint256);

    function collectFee(uint256 _amount) external;
}
