import Web3 from "web3";
import { SignInBody } from "src/props";
import { ethers } from "ethers";
export const signAccount = async (): Promise<SignInBody | undefined> => {
  try {
    if (!window.ethereum) throw new Error("Error : no metamask");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const accounts = await provider.send("eth_requestAccounts", []);
    // const accounts = await window.ethereum.request({
    //   method: "eth_requestAccounts",
    // });
    // console.log(accounts);
    if (accounts && Array.isArray(accounts)) {
      const account = accounts[0];
      const signature = await signer.signMessage("hashmoss");
      console.log(signature, account);
      //   const wallet = new Wallet(account);
      //   console.log(wallet.signMessage("hashmoss"));
      //   const web3 = new Web3(window.ethereum as any);
      //   const temp = web3.utils.keccak256("hashmoss");
      //   console.log(temp);
      //   if (!temp) {
      //     throw new Error("Error : no private_key");
      //   }
      //   const signature = await web3.eth.sign(temp, account);
      return { account, signature };
    }
    throw new Error("Error : no account");
  } catch (e) {}
};
