import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";
import ViewTask from "./pages/ViewTask";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add" element={<AddTask />} />
                <Route path="/edit/:id" element={<EditTask />} />
                <Route path="/view/:id" element={<ViewTask />} />
            </Routes>
        </Router>
    );
}

export default App;
