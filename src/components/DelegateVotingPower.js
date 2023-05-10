import React, { useEffect, useState,useContext } from "react";
import {
  TOKEN_CONTRACT_ADDRESS,
  TOKEN_ABI
} from "../contract/constants";
import useInput from "../hooks/use-input";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import connectToMetamask from "../utils/connectTometamask";
import { toggleModeContext} from "../App.js";

const isNotEmpty = (value) => value.trim() !== "";

const DelegateVotingPower = () => {
  const {
    value: addressValue,
    isValid: addressIsValid,
    hasError: addressHasError,
    valueChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHandler,
    reset: resetAddress,
  } = useInput(isNotEmpty);
  const navigate = useNavigate();


  let formIsValid = false;

  if (addressIsValid) {
    formIsValid = true;
  }
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const [provider, accounts, signer] = await connectToMetamask();
      const contract = new ethers.Contract(
        TOKEN_CONTRACT_ADDRESS,
        TOKEN_ABI,
        signer
      );
      const tx =  await contract.connect(signer).delegate(addressValue);
      const txFinality = await tx.wait();
      console.log(txFinality);
      if (txFinality.blockNumber === null) {
        alert("Transaction Failed");
      } else {
      navigate("/");
    }
   } catch (error) {
      console.error(error.message);
    }
  };
  const { darkMode } =  useContext(toggleModeContext);
  return (
    <>
      <p className="font-normal text-gray-400 text-center">
        Add Address and Delegate the Power to the Voters!
      </p>
      <div
        className={darkMode ? '  border rounded-lg p-3 max-w-4xl': ' text-black border rounded-lg p-3 max-w-4xl'}
        style={{ borderColor: "#2d2d2d" }}
        id="delegate"
      >
        <div className="mx-auto max-w-2xl text 2xl  text-center">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-row ">
              <label
                htmlFor="MATIC"
                className="block mt-5 mb-2 text-left max-w-2xl text-xl font-medium "
              >
                To
              </label>
            </div>
            <input
                // type="text"
                id="toAdd"
                name="toAdd"
                value={addressValue}
                onChange={addressChangeHandler}
                onBlur={addressBlurHandler}
                aria-describedby="helper-text-explanation"
                className="bg-transparent border mx-auto max-w-2xl border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  border-gray-600 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500 "
                placeholder="Address of the user"
              />
               {addressHasError && (
                  <p className="text-center text-red-700">Please enter a valid address.</p>
                )}
            <div>
              <button
               disabled={!formIsValid}
                className="bg-transparent border w-full empty:3 px-12 py-4 rounded-full mt-10 ext font-normal  hover:bg-gray-100 hover:text-black"
                style={{ borderColor: "#2d2d2d" }}
              >
                Delegate Power
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default DelegateVotingPower;
