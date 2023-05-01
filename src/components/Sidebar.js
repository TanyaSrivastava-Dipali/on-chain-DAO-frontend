import {React,useContext} from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import { toggleModeContext} from "../App.js";

const Sidebar = () => {
  const {darkMode} = useContext(toggleModeContext);
  return (
    <div className={darkMode ? 'bg-dark-bg md:w-64 sm:w-full text-white  py-4 px-3 m-5 rounded-xl border' : 'bg-light-bg md:w-64 sm:w-full  text-black py-4 px-3 m-5 rounded-xl border'}
      style={{ borderColor: "#2d2d2d" }}
    >
       <a
        href="#"
        className="inline-block flex m-4 flex-row justify-center text-sm px-4 py-2 leading-none border rounded-full border-black hover:border-transparent hover:bg-gray-400 mt-4 "
      >
        Join
      </a>

      <ul className="space-y-2 sidebar-nav-links">
        <li>
          <NavLink
            to="/"
            className="flex items-center ml-3 p-2 text-base font-normal  rounded-lg hover:bg-gray-300"
          >
            {" "}
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Create"
            className="flex items-center ml-3 p-2 text-base font-normal  rounded-lg hover:bg-gray-300"
          >
            {" "}
            Create Proposal
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Treasury"
            className="flex items-center ml-3 p-2 text-base font-normal rounded-lg  hover:bg-gray-300"
          >
            {" "}
            Treasury
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/About"
            className="flex items-center ml-3 p-2 text-base font-normal  rounded-lg  hover:bg-gray-300"
          >
            {" "}
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Delegate"
            className="flex items-center ml-3 p-2 text-base font-normal  rounded-lg  hover:bg-gray-300"
          >
            {" "}
            Delegate
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
