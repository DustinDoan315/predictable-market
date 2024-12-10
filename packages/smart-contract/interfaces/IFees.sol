// SPDX-License-Identifier: MIT
pragma solidity <0.9.0;

interface IFeesEE {
    error FeeTooHigh();

    event FeeCharged(address indexed receiver, uint256 tokenId, uint256 amount);
}

abstract contract IFees is IFeesEE {
    function getFee() public virtual returns (uint256);

    function setFee(uint256) external virtual;
}
