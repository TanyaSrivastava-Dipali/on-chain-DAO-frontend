import { useContext } from "react";
import Heading from "../components/Heading.js";
import Sidebar from "../components/Sidebar.js";
import { Navbar } from "../components/Navbar.js";
import {toggleModeContext} from "../App.js";

function Home() {

  const { darkMode } =  useContext(toggleModeContext);
  return (
   
      <div className={darkMode ? 'bg-dark-bg text-white' : 'bg-light-bg text-black '}>
        <Navbar />
        <div className="flex flex-col md:flex-row justify-center">
          <div>
            <Sidebar  />
          </div>
          <div
            className="flex flex-col overflow-y-auto px-5"
            style={{ maxHeight: "92vh" }}
          >
            <Heading  />
          </div>
        </div>
      </div>
     
  );
}
export { Home };
