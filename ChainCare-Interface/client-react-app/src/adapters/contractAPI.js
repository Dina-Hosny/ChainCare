import { ethers } from "ethers";
// import ElectronicHealthRecords from "../artifacts/contracts/ElectronicHealthRecords.sol/ElectronicHealthRecords.json"

export const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

export async function requestAccount() {
  await window.ethereum.request({ method: "eth_requestAccounts" });
}

export function initContract() {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      contractAddress,
      ElectronicHealthRecords.abi,
      provider
    );
    return { provider: provider, contract: contract, abi: ElectronicHealthRecords.abi };
  } else {
    return -1;
  }
}

/* 
 Example usage
    import {contractAddress, requestAccount, initContract} from "/adapters/contractAPI"
    requestAccount();
    let result = initContract();
    if(result != 0) {
        const data = await result.Contract.greet();
        console.log('data : ', data); 
    }


*/
