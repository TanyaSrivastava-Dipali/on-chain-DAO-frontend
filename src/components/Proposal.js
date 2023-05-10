import React, { useState,useContext } from "react";
import { Link } from "react-router-dom";
import useInput from "../hooks/use-input";
import { userContext } from "../App";
import { toggleModeContext} from "../App.js";
import { ethers } from "ethers";
import { TREASURY_CONTRACT_ADDRESS, TREASURY_ABI,GOVERNANCE_ABI,GOVERNANCE_CONTRACT_ADDRESS } from "../contract/constants";
import connectToMetamask from "../utils/connectTometamask";

const isNotEmpty = (value) => value.trim() !== "";
export const Proposal = () => {
  const {user} = useContext(userContext);
  const [eventLogs, setEventLogs] = useState([]);
  const {
    value: addressValue,
    isValid: addressIsValid,
    hasError: addressHasError,
    valueChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHandler,
    reset: resetAddress,
  } = useInput(isNotEmpty);
  const {
    value: amountValue,
    isValid: amountIsValid,
    hasError: amountHasError,
    valueChangeHandler: amountChangeHandler,
    inputBlurHandler: amountBlurHandler,
    reset: resetAmount,
  } = useInput(isNotEmpty);
  const {
    value: discussionValue,
    isValid: discussionIsValid,
    hasError: discussionHasError,
    valueChangeHandler: discussionChangeHandler,
    inputBlurHandler: discussionBlurHandler,
    reset: resetDiscussion,
  } = useInput(isNotEmpty);

  let formIsValid = false;

  if (amountIsValid && discussionIsValid && addressIsValid) {
    formIsValid = true;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
const [provider, accounts, signer] = await connectToMetamask();
const gov = new ethers.Contract(GOVERNANCE_CONTRACT_ADDRESS, GOVERNANCE_ABI, signer);
const treasury = new ethers.Contract(TREASURY_CONTRACT_ADDRESS, TREASURY_ABI, signer);
 
const getValueForTreasury = await treasury.interface.encodeFunctionData(
  "releaseFunds",
  [addressValue, ethers.utils.parseUnits(amountValue, 18)]
);
const proposal = await gov.propose(
  [treasury.address],
  [0],
  [getValueForTreasury],
  discussionValue
);
listenToEvent();
console.log("proposal", proposal);
const txn = await proposal.wait(1);
const proposalId = txn.events[0].args.proposalId;
console.log("proposalId", proposalId._hex);
    
resetAddress();
resetAmount();
resetDiscussion();
};

const listenToEvent = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
 const contract = new ethers.Contract(GOVERNANCE_CONTRACT_ADDRESS, GOVERNANCE_ABI, signer);
  console.log("contract", contract);

  contract.on(
    "ProposalCreated",
    (
      proposalId,
      proposer,
      targets,
      values,
      signatures,
      calldatas,
      startBlock,
      endBlock,
      description
    ) => {
      let data = {
        proposalId: proposalId.toString(),
        proposer: proposer.toString(),
        values: values.toString(),
        signatures: signatures.toString(),
        startBlock: startBlock.toString(),
        endBlock: endBlock.toString(),
        description: description.toString(),
        targets: targets.toString(),
        calldatas: calldatas.toString(),
      };
      console.log("data", data);
      setEventLogs((oldState) => [...oldState, data]);
    }
  );
};

const { darkMode } =  useContext(toggleModeContext);
  return (
    <>
     <div className={darkMode ? 'bg-dark-bg text-white mr-5' : 'bg-white text-black mr-5'}>

     <div className="mx-auto  max-w-2xl mt-9">
          <Link
            to="/home"
            className="mt-5 px-4 py-2 mb-10 rounded-lg border shadow-md hover:bg-gray-100 hover:text-black"
          >
            Go back home
          </Link>
        </div>
        
        {eventLogs.reverse().map((event, index) => {
          return (
            <div key={index}>
              <div
                className="md:mx-auto mt-5 block p-6 m-2 max-w-4xl rounded-lg border shadow-md hover:bg-gray-100 sm:mx-5"
                style={{ borderColor: "#2d2d2d" }}
              >
                <p className="font-normal ">
                  Proposal Id : {event.proposalId}
                </p>
                <p className="font-normal ">
                  Proposer Address : {event.proposer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="px-20">
    <form onSubmit={handleSubmit}>
              <label
                htmlFor="title"
                className="block mt-10 mb-2 mx-auto max-w-2xl text-sm font-normal  "
              >
                To
              </label>
              <input
                // type="text"
                id="toAdd"
                name="toAdd"
                value={addressValue}
                onChange={addressChangeHandler}
                onBlur={addressBlurHandler}
                aria-describedby="helper-text-explanation"
                className="bg-transparent border mx-auto max-w-2xl border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  border-gray-600 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500 text-white"
                placeholder="Address of the user"
              />
               {addressHasError && (
                  <p className="text-center text-red-700">Please enter a valid address.</p>
                )}
 
              <label
                htmlFor="message"
                className=" mt-10 block  mb-2 text-sm font-medium  mx-auto max-w-2xl "
              >
                Amount
              </label>
              <input
                type="text"
                id="amount"
                // rows="6"
                name="amount"
                value={amountValue}
                onChange={amountChangeHandler}
                onBlur={amountBlurHandler}
                className="bg-transparent block p-2.5 w-full mx-auto max-w-2xl text-sm rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Amount"
              />
               {amountHasError && (
                  <p className="text-red-700 text-center">Please enter a valid amount.</p>
                )}
              <label
                htmlFor="discussion"
                className="block mt-10 mx-auto max-w-2xl text-sm font-normal  mb-2"
              >
                Discussion
              </label>
              <input
                type="text"
                id="discussion"
                name="discussion"
                value={discussionValue}
                onChange={discussionChangeHandler}
                onBlur={discussionBlurHandler}
                aria-describedby="helper-text-explanation"
                className="bg-transparent border mx-auto max-w-2xl border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  border-gray-600 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500 text-white"
                placeholder="Enter Description"
              />
               {discussionHasError && (
                  <p className="text-red-700 text-center">Please enter a valid description.</p>
                )}
                {user.isConnected && (
        //  when user connected
        <div className="mx-auto block max-w-2xl mt-5">
        <button
          disabled={!formIsValid}
          type="submit"
          className="mt-5 px-4 py-2 mb-10 rounded-lg border shadow-md hover:bg-gray-100 hover:text-black"
        >
          Create a Proposal
        </button>
      </div>
      )}  
       
       {!user.isConnected && (
                <div className="block mt-10 mx-auto max-w-2xl font-normal">
                  <h1>connect metamask wallet first</h1>
                </div>
              )}
            </form>
      </div>
    </>
  );
};
