import "./App.css";
import { Toaster } from "react-hot-toast";
import React from "react";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Main from "./Components/Main";
const App = () => {
  return (
    <>
      <div className="flex flex-col h-screen w-full ">
        <Toaster position="bottom-right" reverseOrder={false} />
        <Header />
        <Main className="flex-grow " />
        <Footer />
      </div>
    </>
  );
};

export default App;
