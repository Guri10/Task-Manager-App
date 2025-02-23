import React from "react";
import TaskList from "../components/TaskList";
import { Link } from "react-router-dom";

const Home = () => {
    return (
<div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
    <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Task Manager</h1>
        <TaskList />
        <div className="mt-4 flex justify-center">
            <Link to="/add" className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition">
                Add New Task
            </Link>
        </div>
    </div>
</div>

    );
};

export default Home;
