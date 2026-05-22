import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import { useEffect, useState } from "react";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/admin" element={<Admin />} />

      </Routes>

    </BrowserRouter>

    </>
  )
}

export default App