import React, { useState, useEffect,useContext } from "react";
import {
  GOVERNANCE_CONTRACT_ADDRESS,
  GOVERNANCE_ABI,
} from "../contract/constants";
import { ethers } from "ethers";
import { toggleModeContext} from "../App.js";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer= provider.getSigner();
const About = () => {
  const {darkMode} = useContext(toggleModeContext);
  const [VotingPeriod, setVotingPeriod] = useState(null);
  const [Token, setToken] = useState(null);
  const [Quorum, setQuorum] = useState(0);
  const getContractDetails = async () => {
    const contract = new ethers.Contract(
      GOVERNANCE_CONTRACT_ADDRESS,
      GOVERNANCE_ABI,
     signer
    );
    const votePeriod = await contract.votingPeriod();
    setVotingPeriod(votePeriod);

    const tokenAddress = await contract.token();
    setToken(tokenAddress);

    const quorumPer = await contract.quorumNumerator();
    setQuorum(quorumPer);
    console.log("votePeriod",VotingPeriod,"tokenAddress",Token,"quorumPer" ,Quorum);
  };

  useEffect(() => {
    getContractDetails();
  }, []);

  return (
    <div className={darkMode ? ' text-white' : ' text-black '}>
      <div className="mx-auto mt-5 max-w-xl text-xl ">
        <h1>About</h1>
      </div>
      <div
        className="mx-auto mt-2 block p-6 m-2 max-w-xl rounded-lg border shadow-md "
        style={{ borderColor: "#2d2d2d", width: "600px" }}
      >
        <h1 className="  text-lg font-semibold">
          Voting Period In Block
        </h1>
        <p className="font-normal ">
          {VotingPeriod !== null && VotingPeriod.toString()}
        </p>

        <h1 className="  text-lg font-semibold mt-4">Vote Token</h1>
        <p className="font-normal  ">
          {Token !== null && Token.toString()}
        </p>

        <h1 className="  text-lg font-semibold mt-4">
          Quorum Percentage
        </h1>
        <p className="font-normal  ">{4}</p>
      </div>
    </div>
  );
};

export default About;
