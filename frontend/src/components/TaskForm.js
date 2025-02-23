import React, { useState } from "react";
import { createTask, updateTask } from "../api";
import { useNavigate } from "react-router-dom";

const TaskForm = ({ task, isEditing }) => {
    const [title, setTitle] = useState(task ? task.title : "");
    const [description, setDescription] = useState(task ? task.description : "");
    const [priority, setPriority] = useState(task ? task.priority : "Medium");
    const [status, setStatus] = useState(task ? task.status : "Pending");
    const [dueDate, setDueDate] = useState(task ? task.due_date : "");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const taskData = { title, description, priority, status, due_date: dueDate };

        if (isEditing) {
            await updateTask(task.id, taskData);
        } else {
            await createTask(taskData);
        }

        navigate("/");
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {isEditing ? "Edit Task" : "Create Task"}
        </h2>
    
        {/* Task Title */}
        <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task Title"
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
        />
    
        {/* Task Description */}
        <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task Description"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
        ></textarea>
    
        {/* Priority Selection */}
        <select 
            value={priority} 
            onChange={(e) => setPriority(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
        >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
        </select>
    
        {/* Status Selection */}
        <select 
            value={status} 
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
        >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
        </select>
    
        {/* Due Date */}
        <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            placeholder="Due Date"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
        />
    
        {/* Submit Button */}
        <button 
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition"
        >
            {isEditing ? "Update Task" : "Add Task"}
        </button>
    </form>
    
    );
};

export default TaskForm;
