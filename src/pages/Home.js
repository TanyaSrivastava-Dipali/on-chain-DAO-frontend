import { useContext,useState,useEffect } from "react";
import Heading from "../components/Heading.js";
import Sidebar from "../components/Sidebar.js";
import { Navbar } from "../components/Navbar.js";
import Card from "../components/Card";
import {toggleModeContext} from "../App.js";
import { ethers } from "ethers";
import {GOVERNANCE_ABI,GOVERNANCE_CONTRACT_ADDRESS} from "../contract/constants";
import Web3 from "web3";
const web3 = new Web3();

const provider = new ethers.providers.Web3Provider(window.ethereum);
const contract = new ethers.Contract(GOVERNANCE_CONTRACT_ADDRESS, GOVERNANCE_ABI, provider);
const filteredDataCopy = contract.filters.ProposalCreated();
console.log("filteredDataCopy", filteredDataCopy);

function Home() {
  const [events, setEvents] = useState([]);

  
  useEffect(() => {
    const init = async () => {
      try {
        const blockNumber = await provider.getBlockNumber();
        const items = await contract.queryFilter(
          filteredDataCopy,
          blockNumber - 950,
          blockNumber - 2,
        );
        // const proposalId = items.map((item) =>
        //   web3.utils.hexToNumberString(item.args[0])
        // );
        items.map((item) =>
        setEvents((prevItems) => [...prevItems, web3.utils.hexToNumberString(item.args[0])])
      );
      } catch (error) {
        console.log("error", error);
      }
    };
    init();
  }, []);

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
            {/* {events.length > 0 && events.map((event, idx) => (
           <h1>{event.toString()}</h1>
          ))} */}
      
            {events.length > 0 && events.map((event, idx) => (
            <Card key={idx} data={event.toString()} />
          ))}
          </div>
        </div>
      </div>
     
  );
}
export { Home };
