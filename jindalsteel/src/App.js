// import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './components/Home/Home';
import Page1 from "./components/Page1/Page1";
import Page2 from "./components/Page2/Page2";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exact={true} path="/" element={<Home />} />
          <Route exact={true} path="/methanol-flow-calculator" element={<Page1 />} />
          <Route exact={true} path="/discharge-pressure-calculator" element={<Page2 />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
