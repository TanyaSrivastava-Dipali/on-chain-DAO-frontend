import React, { useEffect, useState,useContext } from "react";
import { TREASURY_CONTRACT_ADDRESS, TREASURY_ABI } from "../contract/constants";
import useInput from "../hooks/use-input";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import { toggleModeContext} from "../App.js";


const isNotEmpty = (value) => value.trim() !== "";
const Treasury = () => {
  const {
    value: amountValue,
    isValid: amountIsValid,
    hasError: amountHasError,
    valueChangeHandler: amountChangeHandler,
    inputBlurHandler: amountBlurHandler,
    reset: resetAmount,
  } = useInput(isNotEmpty);
  const [accountBalance, setAccountBalance] = useState(0);
  const navigate = useNavigate();

  const getBalance = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balance = await provider.getBalance(TREASURY_CONTRACT_ADDRESS);
    const parseBalance =  ethers.utils.formatEther(balance);
    console.log(parseBalance);
    setAccountBalance(parseBalance);
  };

  useEffect(() => {
    getBalance();
  }, []);


  let formIsValid = false;

  if (!amountHasError) {
    formIsValid = true;
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      console.log(signer);
      const data = {
        to: TREASURY_CONTRACT_ADDRESS,
        value: ethers.utils.parseUnits(amountValue, 18),
      };

      const txn = await signer.sendTransaction(data);
      const Txn = await txn.wait();
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  const { darkMode } =  useContext(toggleModeContext);
  return (
    <>
      <div
        className="border rounded-lg p-3 max-w-4xl"
        style={{ borderColor: "#2d2d2d" }}
        id="treasury"
      >
        <div className="mx-auto  max-w-2xl  text-lg">
          <h5>Treasury</h5>
        </div>
        <div
          className="mx-auto mt-2 block p-2 w-full m-3  max-w-2xl rounded-lg border shadow-md hover:bg-gray-400"
          style={{ borderColor: "#2d2d2d" }}
        >
          <div className="font-medium ">
            <p>The Total balance in the treasury is {accountBalance} ether</p>
          </div>
        </div>

        <div className="mx-auto max-w-2xl text 2xl text-center">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-row ">
              <label
                htmlFor="MATIC"
                className="block mt-5 mb-2 text-left max-w-2xl  font-medium "
              >
                Ether
              </label>
            </div>
            <input
             type="text"
             id="amount"
             // rows="6"
             name="amount"
             value={amountValue}
             onChange={amountChangeHandler}
             onBlur={amountBlurHandler}
              className=" border mx-auto max-w-2xl   text-sm rounded-lg  block w-full p-2.5 bg-transparent border-gray-600  focus:ring-blue-500 focus:border-blue-500"
              min="0"
              style={{ borderColor: "#2d2d2d" }}
            />
              {amountHasError && (
                  <p className="text-red-700 text-center">Please enter a valid amount.</p>
                )}
            <div>
              <button
                 disabled={!formIsValid}
                className="bg-transparent border w-full empty:3 px-12 py-4 rounded-full mt-10 ext font-normal  hover:bg-blue-900"
                style={{ borderColor: "#2d2d2d" }}
              >
                Deposit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Treasury;
