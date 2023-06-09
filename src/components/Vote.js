import React, { useState, useEffect,useContext } from "react";
import VoteModal from "./VoteModal";
import {
  GOVERNANCE_CONTRACT_ADDRESS,
  GOVERNANCE_ABI,
} from "../contract/constants";
import { ethers } from "ethers";
import { useParams } from "react-router-dom";
import { userContext,toggleModeContext } from "../App";

const provider = new ethers.providers.Web3Provider(window.ethereum);

const VoteData = [
  {
    image: "https://mdbootstrap.com/img/new/standard/city/047.jpg",
    address: "0x1e1E768df38eEe85813E93821113c9dd77Bd1111",
    vote: "ACCEPTED",
    value: "8.2 CAKEVO...",
  },
  {
    image: "https://mdbootstrap.com/img/new/standard/city/047.jpg",
    address: "0x2ede48df38eEe85813E93821332c9dd77Bd1111",
    vote: "ABSTAIN",
    value: "5.8 BCJBD...",
  },
];

const VoteFor = [
  {
    voteFor: "Vote against the proposal",
    voteId: "0",
  },
  {
    voteFor: "Vote for the Proposal",
    voteId: "1",
  },
  {
    voteFor: "Abstain your Vote",
    voteId: "2",
  },
];

const Vote = () => {
  const {user} = useContext(userContext);
  const [selectedVote, setSelectVote] = useState();
  const [openVoteModal, setOpenVoteModal] = useState(false);
  const [votes, setVotes] = useState([]);
  // console.log(selectedVote);
  const { id } = useParams();

  useEffect(() => {
    async function fetchVotingDetails() {
      const contract = new ethers.Contract(
        GOVERNANCE_CONTRACT_ADDRESS,
        GOVERNANCE_ABI,
        provider.getSigner()
      );

      const proposalVotes = await contract.proposalVotes(id);
      setVotes(proposalVotes);
      console.log(proposalVotes);
    }
    fetchVotingDetails();
  }, [provider]);

  const { darkMode } =  useContext(toggleModeContext);

  return (
    <>
        <div className={darkMode ? ' text-gray-100' : ' text-gray-700 '}>
        <ul
          className="mx-auto max-w-2xl mt-5 text-lg font-medium   rounded-lg border   border-gray-600 "
          style={{ borderColor: "#2d2d2d" }}
        >
          <li
            className="py-2 px-4 w-full rounded-t-lg border-b  border-gray-600"
            style={{ borderColor: "#2d2d2d" }}
          >
            Cast Your Vote
          </li>
          <li
            className=" py-2 px-4 w-full border-b"
            style={{ borderColor: "#2d2d2d" }}
          >
            {VoteFor.map((vote) => (
              <button
                className=" ml-5 mt-5 mx-auto font-bold w-11/12  py-2 rounded-full border"
                style={{
                  borderColor:
                    selectedVote === vote.voteId ? "#3b82f6" : "#fee2e2",
                }}
                onClick={() => setSelectVote(vote.voteId)}
              >
                {vote.voteFor}
              </button>
            ))}
            {user.isConnected && (
              <button
                className=" ml-5 mt-5 mb-5 bg-blue-600 w-11/12  mx-auto font-bold  py-2 rounded-full border"
                style={{ borderColor: "#2d2d2d" }}
                onClick={() => setOpenVoteModal(true)}
              >
                Vote
              </button>
            )}
            {!user.isConnected && (
              <div className="m-5 text-red-600" style={{ marginLeft: "30%" }}>
                  <h1>!!! connect metamask wallet first</h1>
              </div>
            )}
          </li>
        </ul>
      </div>
      <div>
        <ul
          className="mx-auto max-w-2xl my-5 text-lg font-medium   rounded-lg border   border-gray-600 "
          style={{ borderColor: "#2d2d2d" }}
        >
          <li
            className="py-2 px-4 w-full rounded-t-lg border-b  border-gray-600"
            style={{ borderColor: "#2d2d2d" }}
          >
            Votes - 1
          </li>
          {VoteData.map((data,idx) => (
            <li
              className="flex flex-row justify-between py-2 px-4 w-full border-b  border-gray-600"
              style={{ borderColor: "#2d2d2d" }} 
            >
              <div className="flex flex-row">
                <img src={data.image} className=" h-8 w-8 rounded-full" alt="" />{" "}
                {`${data.address.substring(0, 6)}....${data.address.substring(
                  data.address.length - 4,
                  data.address.length
                )}`}
              </div>
              <div>{data.vote}</div>
              <div>{data.value}</div>
            </li>
          ))}
        </ul>
      </div>
      {openVoteModal && (
        <VoteModal
          setShowModal={setOpenVoteModal}
          voteFor={selectedVote}
          proposalId={id}
        />
      )}
    </>
  );
};

export default Vote;
