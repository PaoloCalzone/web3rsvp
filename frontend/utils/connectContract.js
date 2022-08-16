import abiJSON from "./Web3RSVP.json";
import { ethers } from "ethers";

function connectContract() {
  const contractAddress = "0x39Dc57B8EB6BAc4A893969982d1ef436e30aBAd7";
  const contractABI = abiJSON;
  let rsvpContract;
  try {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      rsvpContract = new ethers.Contract(contractAddress, contractABI, signer);
    } else {
      console.log("Ethereum object doesn't exist");
    }
  } catch (err) {
    console.log("ERROR:", err);
  }
  return rsvpContract;
}

export default connectContract;
