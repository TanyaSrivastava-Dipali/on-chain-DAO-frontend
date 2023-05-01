import {React,useContext} from "react";
import { toggleModeContext} from "../App.js";

const Heading = (props) => {
  const {darkMode} = useContext(toggleModeContext);
  return (
    <div className="px-1">
      <div  className={darkMode ? 'bg-dark-bg text-white mx-auto mt-5 font-bold max-w-2xl text-3xl' : 'bg-light-bg text-black mx-auto mt-5 font-bold max-w-2xl text-3xl'}>
        <h1>Proposals</h1>
      </div>
      <div
        className="mx-auto mt-2 block p-6 m-2 max-w-2xl rounded-lg border shadow-md hover:bg-gray-100"
        style={{ borderColor: "#2d2d2d" }}
      >
        <p className="font-normal text-gray-400 text-center">
          Build Proposals | Get Votes | Enjoy the Easy Funding
        </p>
      </div>
    </div>
  );
};

export default Heading;
