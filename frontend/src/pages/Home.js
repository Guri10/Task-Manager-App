import React from "react";
import TaskList from "../components/TaskList";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <h1>Task Manager</h1>
            <TaskList />
            <Link to="/add">Add New Task</Link>
        </div>
    );
};

export default Home;
