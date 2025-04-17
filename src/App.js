import { Routes } from "react-router";
import "./App.css";
import { Route } from "react-router-dom";
import Authentication from "./components/Authentication/Authentication";
import HomePage from "./components/HomePage/HomePage";
function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={true ? <HomePage /> : <Authentication />} />
      </Routes>
    </div>
  );
}

export default App;
