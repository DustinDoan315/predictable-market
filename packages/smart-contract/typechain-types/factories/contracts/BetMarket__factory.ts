/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type {
  Signer,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../common";
import type { BetMarket, BetMarketInterface } from "../../contracts/BetMarket";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_polyToken",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "allowance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256",
      },
    ],
    name: "ERC20InsufficientAllowance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256",
      },
    ],
    name: "ERC20InsufficientBalance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "approver",
        type: "address",
      },
    ],
    name: "ERC20InvalidApprover",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "ERC20InvalidReceiver",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "ERC20InvalidSender",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "ERC20InvalidSpender",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "marketId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "eventOutcome",
        type: "bool",
      },
    ],
    name: "MarketClosed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "market",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "createdBy",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "creatorImageHash",
        type: "string",
      },
    ],
    name: "MarketCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bool",
        name: "betType",
        type: "bool",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "marketId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "PlaceBet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_marketId",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "eventOutcome",
        type: "bool",
      },
    ],
    name: "closeMarket",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_market",
        type: "string",
      },
      {
        internalType: "string",
        name: "_creatorImageHash",
        type: "string",
      },
      {
        internalType: "string",
        name: "_description",
        type: "string",
      },
      {
        internalType: "string",
        name: "_resolverUrl",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_endTimestamp",
        type: "uint256",
      },
    ],
    name: "createMarket",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_marketId",
        type: "uint256",
      },
    ],
    name: "getMarketData",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "markets",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "market",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "endTimestamp",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "createdBy",
        type: "address",
      },
      {
        internalType: "string",
        name: "creatorImageHash",
        type: "string",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "string",
        name: "resolverUrl",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "totalAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalYesAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalNoAmount",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "eventCompleted",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_marketId",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_betType",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "placeBet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "polyToken",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalMarkets",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "winningAddresses",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "winningAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50604051611f0d380380611f0d83398101604081905261002f9161013e565b336040518060400160405280600b81526020016a253ab634b0902a37b5b2b760a91b8152506040518060400160405280600381526020016212931560ea1b815250816003908161007f919061020d565b50600461008c828261020d565b5050506001600160a01b0381166100bd57604051631e4fbdf760e01b81526000600482015260240160405180910390fd5b6100c6816100ec565b50600680546001600160a01b0319166001600160a01b03929092169190911790556102cb565b600580546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b60006020828403121561015057600080fd5b81516001600160a01b038116811461016757600080fd5b9392505050565b634e487b7160e01b600052604160045260246000fd5b600181811c9082168061019857607f821691505b6020821081036101b857634e487b7160e01b600052602260045260246000fd5b50919050565b601f82111561020857806000526020600020601f840160051c810160208510156101e55750805b601f840160051c820191505b8181101561020557600081556001016101f1565b50505b505050565b81516001600160401b038111156102265761022661016e565b61023a816102348454610184565b846101be565b6020601f82116001811461026e57600083156102565750848201515b600019600385901b1c1916600184901b178455610205565b600084815260208120601f198516915b8281101561029e578785015182556020948501946001909201910161027e565b50848210156102bc5786840151600019600387901b60f8161c191681555b50505050600190811b01905550565b611c33806102da6000396000f3fe608060405234801561001057600080fd5b50600436106101375760003560e01c80638162486b116100b8578063b78d6c1d1161007c578063b78d6c1d14610295578063bfacba3d146102a8578063da6b4db8146102cd578063dd62ed3e146102ed578063f2fde38b14610326578063f47c43cf1461033957600080fd5b80638162486b146102355780638da5cb5b1461023e57806395d89b411461024f578063a9059cbb14610257578063b1283e771461026a57600080fd5b8063313ce567116100ff578063313ce567146101b75780633f4a5d0a146101c65780636faa22a5146101d957806370a0823114610204578063715018a61461022d57600080fd5b806306fdde031461013c578063095ea7b31461015a57806318160ddd1461017d5780631a38cac61461018f57806323b872dd146101a4575b600080fd5b61014461034c565b60405161015191906115fc565b60405180910390f35b61016d610168366004611632565b6103de565b6040519015158152602001610151565b6002545b604051908152602001610151565b6101a261019d36600461166a565b6103f8565b005b61016d6101b23660046116a2565b610740565b60405160128152602001610151565b6101a26101d4366004611773565b610764565b6006546101ec906001600160a01b031681565b6040516001600160a01b039091168152602001610151565b61018161021236600461183b565b6001600160a01b031660009081526020819052604090205490565b6101a261085b565b61018160075481565b6005546001600160a01b03166101ec565b61014461086f565b61016d610265366004611632565b61087e565b61027d610278366004611856565b61088c565b6040516101519c9b9a9998979695949392919061186f565b6101ec6102a3366004611856565b610b18565b6102bb6102b6366004611856565b610b42565b60405161015196959493929190611919565b6101816102db36600461183b565b60096020526000908152604090205481565b6101816102fb366004611957565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6101a261033436600461183b565b610c2e565b6101a261034736600461198a565b610c6c565b60606003805461035b906119ba565b80601f0160208091040260200160405190810160405280929190818152602001828054610387906119ba565b80156103d45780601f106103a9576101008083540402835291602001916103d4565b820191906000526020600020905b8154815290600101906020018083116103b757829003601f168201915b5050505050905090565b6000336103ec818585610d31565b60019150505b92915050565b600654604051636eb1769f60e11b815233600482015230602482015282916001600160a01b03169063dd62ed3e90604401602060405180830381865afa158015610446573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061046a91906119f4565b8111156104be5760405162461bcd60e51b815260206004820152601e60248201527f4e6f7420616c6c6f77656420746f207370656e642074686973206d756368000060448201526064015b60405180910390fd5b6000848152600860205260409020600b81015460ff16156105215760405162461bcd60e51b815260206004820152601860248201527f54686973206d61726b657420697320636f6d706c65746564000000000000000060448201526064016104b5565b806003015442106105655760405162461bcd60e51b815260206004820152600e60248201526d10995d1d1a5b99c818db1bdcd95960921b60448201526064016104b5565b6006546040516323b872dd60e01b8152336004820152306024820152604481018590526001600160a01b03909116906323b872dd906064016020604051808303816000875af11580156105bc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105e09190611a0d565b506040805180820190915233815260208101849052841561065c57600d820180546001808201835560009283526020808420855160029094020180546001600160a01b0319166001600160a01b03909416939093178355840151910155600983018054869290610651908490611a40565b909155506106b89050565b600e820180546001808201835560009283526020808420855160029094020180546001600160a01b0319166001600160a01b03909416939093178355840151910155600a830180548692906106b2908490611a40565b90915550505b336000908152600c83016020526040812080548692906106d9908490611a40565b92505081905550838260080160008282546106f49190611a40565b909155505060408051861515815260208101869052339188917f93e4ba582522b998ad9f0fd1bde483b65d1e281ab019af5f6c001f8498c2a24c910160405180910390a3505050505050565b60003361074e858285610d43565b610759858585610dc1565b506001949350505050565b61076c610e20565b60078054908190600061077e83611a53565b90915550506000818152600860205260409020818155600181016107a28882611aba565b504260028201556004810180546001600160a01b03191633179055600581016107cb8782611aba565b50600681016107da8682611aba565b50600781016107e98582611aba565b506003810183905560006008820181905560098201819055600a820155600b8101805460ff19169055604051339083907fb788ace5260aa401ac0977016279947ce850bbb6b3cd581db7838b51359b127f9061084a908b9042908c90611b79565b60405180910390a350505050505050565b610863610e20565b61086d6000610e4d565b565b60606004805461035b906119ba565b6000336103ec818585610dc1565b600860205260009081526040902080546001820180549192916108ae906119ba565b80601f01602080910402602001604051908101604052809291908181526020018280546108da906119ba565b80156109275780601f106108fc57610100808354040283529160200191610927565b820191906000526020600020905b81548152906001019060200180831161090a57829003601f168201915b505050600284015460038501546004860154600587018054969793969295506001600160a01b0390911693509061095d906119ba565b80601f0160208091040260200160405190810160405280929190818152602001828054610989906119ba565b80156109d65780601f106109ab576101008083540402835291602001916109d6565b820191906000526020600020905b8154815290600101906020018083116109b957829003601f168201915b5050505050908060060180546109eb906119ba565b80601f0160208091040260200160405190810160405280929190818152602001828054610a17906119ba565b8015610a645780601f10610a3957610100808354040283529160200191610a64565b820191906000526020600020905b815481529060010190602001808311610a4757829003601f168201915b505050505090806007018054610a79906119ba565b80601f0160208091040260200160405190810160405280929190818152602001828054610aa5906119ba565b8015610af25780601f10610ac757610100808354040283529160200191610af2565b820191906000526020600020905b815481529060010190602001808311610ad557829003601f168201915b5050505060088301546009840154600a850154600b909501549394919390925060ff168c565b600a8181548110610b2857600080fd5b6000918252602090912001546001600160a01b0316905081565b6060600080600080600080600860008981526020019081526020016000209050806001018160080154826009015483600a0154846003015485600b0160009054906101000a900460ff16858054610b98906119ba565b80601f0160208091040260200160405190810160405280929190818152602001828054610bc4906119ba565b8015610c115780601f10610be657610100808354040283529160200191610c11565b820191906000526020600020905b815481529060010190602001808311610bf457829003601f168201915b505050505095509650965096509650965096505091939550919395565b610c36610e20565b6001600160a01b038116610c6057604051631e4fbdf760e01b8152600060048201526024016104b5565b610c6981610e4d565b50565b610c74610e20565b6000828152600860205260409020600b81015460ff1615610cd75760405162461bcd60e51b815260206004820152601860248201527f4d61726b657420616c726561647920636f6d706c65746564000000000000000060448201526064016104b5565b600b8101805460ff19166001179055610cf08383610e9f565b827f41ee1d549fef567720af5965338f43ac949febe75e73dc873f9b84c478cc164483604051610d24911515815260200190565b60405180910390a2505050565b610d3e8383836001611385565b505050565b6001600160a01b038381166000908152600160209081526040808320938616835292905220546000198114610dbb5781811015610dac57604051637dc7a0d960e11b81526001600160a01b038416600482015260248101829052604481018390526064016104b5565b610dbb84848484036000611385565b50505050565b6001600160a01b038316610deb57604051634b637e8f60e11b8152600060048201526024016104b5565b6001600160a01b038216610e155760405163ec442f0560e01b8152600060048201526024016104b5565b610d3e83838361145a565b6005546001600160a01b0316331461086d5760405163118cdaa760e01b81523360048201526024016104b5565b600580546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b600082815260086020526040902081156110765760005b600d820154811015611070576000826009015483600d018381548110610ede57610ede611bae565b90600052602060002090600202016001015484600a0154610eff9190611bc4565b610f099190611bdb565b905082600d018281548110610f2057610f20611bae565b90600052602060002090600202016001015481610f3d9190611a40565b6009600085600d018581548110610f5657610f56611bae565b600091825260208083206002909202909101546001600160a01b0316835282019290925260400181208054909190610f8f908490611a40565b9091555050600d8301805483908110610faa57610faa611bae565b90600052602060002090600202016001015481610fc79190611a40565b6009600085600d018581548110610fe057610fe0611bae565b600091825260208083206002909202909101546001600160a01b031683528201929092526040019020540361106757600a83600d01838154811061102657611026611bae565b600091825260208083206002909202909101548354600181018555938352912090910180546001600160a01b0319166001600160a01b039092169190911790555b50600101610eb6565b50611235565b60005b600e82015481101561123357600082600a015483600e0183815481106110a1576110a1611bae565b90600052602060002090600202016001015484600901546110c29190611bc4565b6110cc9190611bdb565b905082600e0182815481106110e3576110e3611bae565b906000526020600020906002020160010154816111009190611a40565b6009600085600e01858154811061111957611119611bae565b600091825260208083206002909202909101546001600160a01b0316835282019290925260400181208054909190611152908490611a40565b9091555050600e830180548390811061116d5761116d611bae565b9060005260206000209060020201600101548161118a9190611a40565b6009600085600e0185815481106111a3576111a3611bae565b600091825260208083206002909202909101546001600160a01b031683528201929092526040019020540361122a57600a83600e0183815481106111e9576111e9611bae565b600091825260208083206002909202909101548354600181018555938352912090910180546001600160a01b0319166001600160a01b039092169190911790555b50600101611079565b505b60005b600a5481101561137857600654600a80546001600160a01b039092169163a9059cbb91908490811061126c5761126c611bae565b9060005260206000200160009054906101000a90046001600160a01b031660096000600a86815481106112a1576112a1611bae565b6000918252602080832091909101546001600160a01b039081168452908301939093526040918201902054905160e085901b6001600160e01b031916815292909116600483015260248201526044016020604051808303816000875af115801561130f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113339190611a0d565b5060096000600a838154811061134b5761134b611bae565b60009182526020808320909101546001600160a01b03168352820192909252604001812055600101611238565b50610d3e600a6000611584565b6001600160a01b0384166113af5760405163e602df0560e01b8152600060048201526024016104b5565b6001600160a01b0383166113d957604051634a1406b160e11b8152600060048201526024016104b5565b6001600160a01b0380851660009081526001602090815260408083209387168352929052208290558015610dbb57826001600160a01b0316846001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9258460405161144c91815260200190565b60405180910390a350505050565b6001600160a01b03831661148557806002600082825461147a9190611a40565b909155506114f79050565b6001600160a01b038316600090815260208190526040902054818110156114d85760405163391434e360e21b81526001600160a01b038516600482015260248101829052604481018390526064016104b5565b6001600160a01b03841660009081526020819052604090209082900390555b6001600160a01b03821661151357600280548290039055611532565b6001600160a01b03821660009081526020819052604090208054820190555b816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405161157791815260200190565b60405180910390a3505050565b5080546000825590600052602060002090810190610c6991905b808211156115b2576000815560010161159e565b5090565b6000815180845260005b818110156115dc576020818501810151868301820152016115c0565b506000602082860101526020601f19601f83011685010191505092915050565b60208152600061160f60208301846115b6565b9392505050565b80356001600160a01b038116811461162d57600080fd5b919050565b6000806040838503121561164557600080fd5b61164e83611616565b946020939093013593505050565b8015158114610c6957600080fd5b60008060006060848603121561167f57600080fd5b8335925060208401356116918161165c565b929592945050506040919091013590565b6000806000606084860312156116b757600080fd5b6116c084611616565b925061169160208501611616565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126116f557600080fd5b813567ffffffffffffffff81111561170f5761170f6116ce565b604051601f8201601f19908116603f0116810167ffffffffffffffff8111828210171561173e5761173e6116ce565b60405281815283820160200185101561175657600080fd5b816020850160208301376000918101602001919091529392505050565b600080600080600060a0868803121561178b57600080fd5b853567ffffffffffffffff8111156117a257600080fd5b6117ae888289016116e4565b955050602086013567ffffffffffffffff8111156117cb57600080fd5b6117d7888289016116e4565b945050604086013567ffffffffffffffff8111156117f457600080fd5b611800888289016116e4565b935050606086013567ffffffffffffffff81111561181d57600080fd5b611829888289016116e4565b95989497509295608001359392505050565b60006020828403121561184d57600080fd5b61160f82611616565b60006020828403121561186857600080fd5b5035919050565b8c81526101806020820152600061188a61018083018e6115b6565b604083018d9052606083018c90526001600160a01b038b16608084015282810360a08401526118b9818b6115b6565b905082810360c08401526118cd818a6115b6565b905082810360e08401526118e181896115b6565b91505085610100830152846101208301528361014083015261190861016083018415159052565b9d9c50505050505050505050505050565b60c08152600061192c60c08301896115b6565b602083019790975250604081019490945260608401929092526080830152151560a090910152919050565b6000806040838503121561196a57600080fd5b61197383611616565b915061198160208401611616565b90509250929050565b6000806040838503121561199d57600080fd5b8235915060208301356119af8161165c565b809150509250929050565b600181811c908216806119ce57607f821691505b6020821081036119ee57634e487b7160e01b600052602260045260246000fd5b50919050565b600060208284031215611a0657600080fd5b5051919050565b600060208284031215611a1f57600080fd5b815161160f8161165c565b634e487b7160e01b600052601160045260246000fd5b808201808211156103f2576103f2611a2a565b600060018201611a6557611a65611a2a565b5060010190565b601f821115610d3e57806000526020600020601f840160051c81016020851015611a935750805b601f840160051c820191505b81811015611ab35760008155600101611a9f565b5050505050565b815167ffffffffffffffff811115611ad457611ad46116ce565b611ae881611ae284546119ba565b84611a6c565b6020601f821160018114611b1c5760008315611b045750848201515b600019600385901b1c1916600184901b178455611ab3565b600084815260208120601f198516915b82811015611b4c5787850151825560209485019460019092019101611b2c565b5084821015611b6a5786840151600019600387901b60f8161c191681555b50505050600190811b01905550565b606081526000611b8c60608301866115b6565b8460208401528281036040840152611ba481856115b6565b9695505050505050565b634e487b7160e01b600052603260045260246000fd5b80820281158282048414176103f2576103f2611a2a565b600082611bf857634e487b7160e01b600052601260045260246000fd5b50049056fea2646970667358221220cc8b3da5b95866e106e2463a0291f34ef937799545e06f525e26c5080685a55664736f6c634300081b0033";

type BetMarketConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: BetMarketConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class BetMarket__factory extends ContractFactory {
  constructor(...args: BetMarketConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    _polyToken: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(_polyToken, overrides || {});
  }
  override deploy(
    _polyToken: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(_polyToken, overrides || {}) as Promise<
      BetMarket & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): BetMarket__factory {
    return super.connect(runner) as BetMarket__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BetMarketInterface {
    return new Interface(_abi) as BetMarketInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): BetMarket {
    return new Contract(address, _abi, runner) as unknown as BetMarket;
  }
}
