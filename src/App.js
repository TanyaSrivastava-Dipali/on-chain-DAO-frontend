import { Route, Routes, Navigate } from "react-router-dom";
import { createContext, useState,useEffect } from "react";
import {Home} from "./pages/Home";
import AllProposal from "./pages/AllProposal";
import NewProposal from "./pages/NewProposal";
import NotFound from "./pages/NotFound";
import Vote from "./pages/Vote";
import Treasury from "./pages/Treasury";
import Aboutpage from "./pages/About";
import Delegate from "./pages/Delegate";

const userContext = createContext();
const toggleModeContext = createContext();
function App() {
  const [user, setUser] = useState({
    isConnected: false,
    address: null,
  });
  
  const [darkMode, setDarkMode] = useState(true);
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };


  return (
    <div className={darkMode ? 'bg-dark-bg text-white' : 'bg-light-bg text-black '}>
        <userContext.Provider value={{ user, setUser }}>
    <toggleModeContext.Provider value={{ toggleDarkMode, darkMode }} >

    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<Aboutpage />} />
      <Route path="/create/" element={<NewProposal />} />
      <Route path="/allProposal/" element={<AllProposal />} />
      <Route path="/vote/" element={<Vote />} />
      <Route path="/treasury/" element={<Treasury />} />
      <Route path="/Delegate" element={<Delegate/>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </toggleModeContext.Provider >
    </userContext.Provider>

     </div>
  );
}

export  { App, userContext,toggleModeContext};