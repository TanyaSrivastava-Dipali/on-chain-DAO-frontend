import React, { useContext } from "react";
import { toggleModeContext } from "../App";

const Sidetabs = () => {
  const { darkMode } =  useContext(toggleModeContext);
  return (
    <div className={darkMode ? ' text-gray-100' : ' text-gray-700 '}>
      <div>
        <ul
          className="mx-auto w-72 mt-5  rounded-lg border border-gray-600 "
       
        >
          <li
            className="py-2 px-4 w-full font-bold rounded-t-lg border-b border-gray-600"
         
          >
            information
          </li>
          <li
            className="flex flex-row justify-between py-2 px-4 w-full border-b border-gray-600"
         
          >
            <div  className="font-bold">IPFS</div>
            <div className="">#bafkrei</div>
          </li>
          <li
            className="flex flex-row justify-between py-2 px-4 w-full border-b border-gray-600"
            style={{ borderColor: "#2d2d2d" }}
          >
            <div  className="font-bold">Voting system</div>
            <div className="">Single choice voting</div>
          </li>
          <li
            className="flex flex-row justify-between py-2 px-4 w-full border-b border-gray-600"
            style={{ borderColor: "#2d2d2d" }}
          >
            <div  className="font-bold">Start date</div>
            <div className="">Jul 12, 2022, 7:47 PM</div>
          </li>
          <li
            className="flex flex-row justify-between py-2 px-4 w-full border-b border-gray-600"
            style={{ borderColor: "#2d2d2d" }}
          >
            <div  className="font-bold">End date</div>
            <div className="">Jul 16, 2022, 2:30 PM</div>
          </li>
          <li
            className="flex flex-row justify-between py-2 px-4 w-full border-b border-gray-600"
            style={{ borderColor: "#2d2d2d" }}
          >
            <div  className="font-bold">Snapshot</div>
            <div className="">15,128,294</div>
          </li>
        </ul>
      </div>
      <div>
        <ul
          className="mx-auto w-72 mt-5 font-normal  rounded-lg border border-gray-600"
          style={{ borderColor: "#2d2d2d" }}
        >
          <li
            className="py-2 px-4 w-full rounded-t-lg border-b border-gray-600 font-bold"
            style={{ borderColor: "#2d2d2d" }}
          >
            Admins
          </li>
          <li
            className=" py-2 px-4 w-full border-b border-gray-600"
            style={{ borderColor: "#2d2d2d" }}
          >
            <div>I’d stake Cake.. 19 CAKEVO.. 95.09%</div>
            <div>
              <progress
                className="w-full rounded h-1 "
                id="file"
                value="95"
                max="100"
              >
                {" "}
                95%{" "}
              </progress>
            </div>
          </li>
          <li
            className=" py-2 px-4 w-full border-b border-gray-600"
            style={{ borderColor: "#2d2d2d" }}
          >
            <div>I’d add liquidity.. 1CAKEVO.. 4.91%</div>
            <div>
              <progress
                className="w-full rounded h-1 "
                id="file"
                value="4"
                max="100"
              >
                {" "}
                4%{" "}
              </progress>
            </div>
          </li>
          <li
            className=" py-2 px-4 w-full border-b border-gray-600"
            style={{ borderColor: "#2d2d2d" }}
          >
            <div>No carbo pool.. 0CAKEVO.. 0%</div>
            <div>
              <progress
                className="w-full rounded h-1 "
                id="file"
                value="0"
                max="100"
              >
                {" "}
                0{" "}
              </progress>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidetabs;
