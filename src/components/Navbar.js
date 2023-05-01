import {React,useContext} from "react";
import { NavLink } from "react-router-dom";
import { MoonIcon, SunIcon } from '@heroicons/react/outline';
import "./Navbar.css";
import {userContext} from "../App";
import connectToMetamask from "../utils/connectTometamask";
import metamaskImg from "./assets/metamask.png";
import defaultProfileImg from "./assets/defaultProfile.jpg";
import { toggleModeContext} from "../App.js";


export const Navbar = () => {
  const {user, setUser} = useContext(userContext);
  const { darkMode, toggleDarkMode } =  useContext(toggleModeContext);
  const logIn = async () => {
    try {
      const [provider, accounts, signer] = await connectToMetamask();
      setUser({
      isConnected: true,
      address: accounts[0]
      });
    } catch (err) {
      if (err.code === 4001) {
        window.alert("User Rejected Metamask Connection");
      } else {
        console.log(err);
      }
    }
  };
  return (
    <div className={darkMode ? 'bg-dark-bg text-white mr-5' : 'bg-white text-black mr-5'} >
      <nav className={darkMode ? 'bg-dark-bg text-white mr-5' : 'bg-white text-black mr-5'}> 
        <div>
          <NavLink to="/">
            <div className="h-14 w-14 mt-10 overflow-hidden rounded-full">
            <img
              src="https://media.licdn.com/dms/image/C510BAQGbJciAIl3Mhg/company-logo_200_200/0/1525862345784?e=2147483647&v=beta&t=VGPJhJ__Di_sqqgohcUgSATNweOg0eLTIrQoBtUyyxc"
              alt="SoluLab Logo"
              />
            </div>
              </NavLink>
            <span className={darkMode ? 'text-white  mt-20' : ' text-black mt-20'} >
              SoluLab 
            </span>
            <div className="flex justify-end items-center h-16 mt-7 ">
        <button
          className="text-gray-400 dark:text-gray-400 hover:text-gray-300 dark:hover:text-gray-500"
          onClick={toggleDarkMode}
        >
          {darkMode ? (
            <SunIcon className="h-8 w-8 mr-10" />
          ) : (
            <MoonIcon className="h-8 w-8 mr-10" />
          )}
        </button>
      </div>
            {user.isConnected ? (
        //  when user connected

        <div className="flex items-center  mt-8 px-2 mr-4">
          <img
            src={defaultProfileImg}
            alt=""
            className=" w-8 h-8 rounded-full mr-2 hover:cursor-pointer"
          />

          <div className="text-red-600  dark:text-gray-300 w-24">{user.address}</div>
        </div>
      ) : (
        // when user not connected
        <div className="flex items-center px-4  mr-2">
          <img
            src={metamaskImg}
            alt=""
            className="w-8 h-8 mt-8 mr-2 hover:cursor-pointer"
            onClick={logIn}
          />
        </div>
      )}
        </div>
      </nav>
    </div>
  );
};