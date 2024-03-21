import { MerkleTree } from "merkletreejs";
import { keccak256 } from "ethers/lib/utils";
import { utils } from "ethers";
import * as web3 from "@solana/web3.js";
import * as bs58 from "bs58";
import { decimalSlice } from "./format";
export const centerEllipsis = (text: string) => {
  return `${text.slice(0, 6)}...${text.slice(-6)}`;
};

export const etherToWei = (number: number) => {
  return utils.parseEther(`${number}`).toString();
};

export const weiToEther = (amount: string) => {
  return parseInt(amount) / Math.pow(10, 18);
};

export const getMerkleTree = (addresses: string[]) => {
  const leaves = addresses.sort().map((address) => keccak256(address));
  const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
  return { root: tree.getHexRoot(), tree };
};
export const getMerkleProof = (addresses: string[], address: string) => {
  const tree = getMerkleTree(addresses).tree;
  const leaf = keccak256(address);
  const proof = tree.getHexProof(leaf);
  return proof;
};
export const getProof = (tree: MerkleTree, address: string) => {
  const leaf = keccak256(address);
  const proof = tree.getHexProof(leaf);
  return proof;
};
export const isMerkleVerified = (tree: MerkleTree, address: string) => {
  const leaf = keccak256(address);
  const proof = tree.getHexProof(leaf);
  return tree.verify(proof, leaf, tree.getRoot());
};

export const string2Key = (value: string) => {
  return web3.Keypair.fromSecretKey(bs58.decode(value));
};

export const lam2Sol = (value: number) => {
  return decimalSlice(value / 1000000000);
};

export const sol2Lam = (value: number) => {
  return Math.trunc(value * 1000000000);
};

export const generateKeyPair = () => {
  const keyPair = web3.Keypair.generate();
  return {
    publicKey: keyPair.publicKey.toBase58(),
    privateKey: bs58.encode(keyPair.secretKey),
  };
};

export const verifyWallet = async (addr: string) => {
  let publicKey: web3.PublicKey;
  try {
    publicKey = new web3.PublicKey(addr);
    return await web3.PublicKey.isOnCurve(publicKey.toBytes());
  } catch (err) {
    return false;
  }
};

export const createTransaction = () => {
  return new web3.Transaction();
};
