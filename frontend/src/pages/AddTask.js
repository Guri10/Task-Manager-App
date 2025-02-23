import React from "react";
import TaskForm from "../components/TaskForm";

const AddTask = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-xl">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Add New Task</h2>
                <TaskForm />
            </div>
        </div>
    );
};

export default AddTask;
