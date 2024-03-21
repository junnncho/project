// import { Injectable } from '@nestjs/common';
// import { ethers } from 'ethers';
// const privatekey =
//   '0x282191b3a18e5f8dec7969081d7f371186e4395392ef9c889b9e8c0e6cbdf538';
// const address = '0xe5b66759a76bdf3643e3dfb19eABe74C29dB2442';
// const abi = [
//   {
//     inputs: [],
//     name: 'transferEther',
//     outputs: [],
//     stateMutability: 'nonpayable',
//     type: 'function',
//   },
//   {
//     inputs: [
//       {
//         internalType: 'address',
//         name: '_owner',
//         type: 'address',
//       },
//       {
//         internalType: 'address',
//         name: '_generator',
//         type: 'address',
//       },
//     ],
//     stateMutability: 'nonpayable',
//     type: 'constructor',
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: false,
//         internalType: 'uint256',
//         name: 'amount',
//         type: 'uint256',
//       },
//     ],
//     name: 'withdrawInfo',
//     type: 'event',
//   },
//   {
//     stateMutability: 'payable',
//     type: 'receive',
//   },
//   {
//     inputs: [],
//     name: 'generator',
//     outputs: [
//       {
//         internalType: 'address',
//         name: '',
//         type: 'address',
//       },
//     ],
//     stateMutability: 'view',
//     type: 'function',
//   },
//   {
//     inputs: [],
//     name: 'owner',
//     outputs: [
//       {
//         internalType: 'address',
//         name: '',
//         type: 'address',
//       },
//     ],
//     stateMutability: 'view',
//     type: 'function',
//   },
//   {
//     inputs: [],
//     name: 'viewBalance123',
//     outputs: [
//       {
//         internalType: 'uint256',
//         name: '',
//         type: 'uint256',
//       },
//     ],
//     stateMutability: 'view',
//     type: 'function',
//   },
// ];

// @Injectable()
// export class ContractService {
//   private readonly provider: ethers.JsonRpcProvider;
//   private readonly signer: ethers.Wallet;

//   constructor() {
//     const network = 'https://rpc-mumbai.maticvigil.com/'; // Replace with the URL of the Mumbai Polygon network
//     this.provider = new ethers.JsonRpcProvider(network);
//     this.signer = new ethers.Wallet(privatekey, this.provider);
//   }

//   async withdraw(): Promise<void> {
//     const contract = new ethers.Contract(address, abi, this.signer);
//     const gasPrice = await this.provider._perform({ method: 'getGasPrice' });
//     const nonce = await this.signer.getNonce();
//     console.log('nonce', nonce);
//     const a = await contract.viewBalance123();
//     // await a.wait();
//     console.log(a);
//     const tx = await contract.transferEther({ gasLimit: 100000, gasPrice });
//     await tx.wait();
//     // console.log(contract.getEvent('withdrawInfo').call());
//     console.log(tx.value);
//     console.log(tx.hash, tx);
//   }
// }
