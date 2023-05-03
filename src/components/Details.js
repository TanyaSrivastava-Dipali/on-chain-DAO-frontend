import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TREASURY_CONTRACT_ADDRESS, TREASURY_ABI,GOVERNANCE_ABI,GOVERNANCE_CONTRACT_ADDRESS } from "../contract/constants";
import { ethers } from "ethers";
import { BigNumber } from "ethers";

const provider = new ethers.providers.Web3Provider(window.ethereum);

const Details = () => {
  const [votingPeriod, setVotingPeriod] = useState(null);
  const [state, setState] = useState();
  const [propThreshold, setPropThreshold] = useState();
  const [blockNumber, setBlockNumber] = useState();
  const [quorum, setQuorum] = useState();
  const { id } = useParams();

  useEffect(() => {
    async function fetchVotingDetails() {
      const contract = new ethers.Contract(
        GOVERNANCE_CONTRACT_ADDRESS,
        GOVERNANCE_ABI,
        provider.getSigner()
      );
      console.log(contract);
      const period = await contract.votingPeriod();
      console.log("period:",period.toString());
      const state = await contract.state(id);
      console.log("state:",state);
      const proposalThreshold = await contract.proposalThreshold();
      console.log("propThreshold:",proposalThreshold.toString());
      const blockNumber = await provider.getBlockNumber();
      console.log(blockNumber);
      const quorum = await contract.quorum(blockNumber-1);
      console.log("quorum:",quorum.toString());
      setBlockNumber(blockNumber);
      setVotingPeriod(period);
      setState(state);
      setQuorum(quorum.toString());
      setPropThreshold(proposalThreshold.toString());
    }
    fetchVotingDetails();
  }, [provider]);

  const values = {
    toAdd: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    amount: "0.1",
    discussion: "release funds!",
  };

  const handleQueue = async () => {
  const gov = new ethers.Contract(GOVERNANCE_CONTRACT_ADDRESS, GOVERNANCE_ABI, provider.getSigner());
    const treasury = new ethers.Contract(TREASURY_CONTRACT_ADDRESS, TREASURY_ABI, provider.getSigner());
    const getValueForTreasury = await treasury.interface.encodeFunctionData(
      "releaseFunds", ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"]);
    console.log("getValueForTreasury", getValueForTreasury);

    const queue = await gov.queue(
      [treasury.address],
      [0],
      [getValueForTreasury],
      ethers.utils.keccak256(ethers.utils.toUtf8Bytes("release funds!"))
    );
  };

  const handleExecute = async () => {
    const gov = new ethers.Contract(GOVERNANCE_CONTRACT_ADDRESS, GOVERNANCE_ABI, provider.getSigner());
    const treasury = new ethers.Contract(TREASURY_CONTRACT_ADDRESS, TREASURY_ABI, provider.getSigner());
  ;
    console.log("treasury", treasury);
    const getValueForTreasury = await treasury.interface.encodeFunctionData(
      "releaseFunds", ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"]);
    console.log("getValueForTreasury", getValueForTreasury);

    const execute = await gov.execute(
      [treasury.address],
      [0],
      [getValueForTreasury],
    ethers.utils.keccak256(ethers.utils.toUtf8Bytes("release funds!"))
     );

  };

  return (
    <div>
      <div className="mx-auto max-w-2xl">
        <div className=" mt-5  text-3xl font-bold text-gray-50">
          <h1>First Proposal</h1>
        </div>

        {state === 4 ? (
          <div className="mt-5 flex flex-row">
            <button
              onClick={handleQueue}
              className="bg-blue-400 hover:bg-blue-700 text-white font-bold  px-2 ml-10"
            >
              Queue
            </button>
          </div>
        ) : (
          ""
        )}

        {state === 5 ? (
          <div className="mt-5 flex flex-row">
            <button
              onClick={handleExecute}
              className="bg-green-500 hover:bg-blue-700 text-white font-bold  px-2 rounded-full"
            >
              Execute
            </button>
          </div>
        ) : (
          ""
        )}

        <div className="mt-5 flex flex-row">
          <button className="bg-green-500 hover:bg-blue-700 h-6 w-30 text-white font-bold  px-2 rounded-full">
            Active
          </button>
         <ul>
          <li>
          <img
            src="https://mdbootstrap.com/img/new/standard/city/041.jpg"
            className=" h-7 w-7 ml-5 rounded-full inline"
            alt=""
          />
          
          <p className=" font-medium inline text-gray-400 ml-2">
            Address of the user!
          </p>
          </li>
          <br/>
            <li>
          {votingPeriod !== null && (
            <p className=" font-medium text-xl text-gray-400  ">
              Voting period: {votingPeriod.toString()}
            </p>
          )}
          </li>
          <li>
          <p className=" font-medium text-xl text-gray-400 ">
            Quorum Requirement: {quorum} 
          </p>
          </li>
          <li>
          {propThreshold !== null && (
            <p className=" font-medium text-xl text-gray-400">
              Proposal Threshold: {propThreshold}
            </p>
          )}
          </li>
          <li>
          <p className=" font-medium text-xl text-gray-400 ">
            Proposal ID: {id}
          </p>
          </li>
          </ul>
        </div>
        <div className=" mt-5  text-3xl font-bold text-gray-50">
          <h1>Members Votes</h1>
        </div>
      </div>
    </div>
  );
};

export default Details;
