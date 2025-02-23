import React, { useEffect, useState } from "react";
import { getTasks, deleteTask } from "../api";

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const data = await getTasks();
        setTasks(data);
    };

    const handleDelete = async (id) => {
        await deleteTask(id);
        fetchTasks(); // Refresh the list
    };

    return (
<div className="bg-white shadow-md rounded-lg p-6">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">Task List</h2>
    <ul className="space-y-4">
        {tasks.map((task) => (
            <li key={task.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-100 p-4 rounded-lg shadow">
                <div>
                    <strong className="text-lg text-gray-700">{task.title}</strong> - <span className="text-gray-500">{task.status}</span>
                </div>
                <div className="flex space-x-2 mt-2 sm:mt-0">
                    <button 
                        onClick={() => handleDelete(task.id)} 
                        className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                        Delete
                    </button>
                    <a href={`/edit/${task.id}`} className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition">
                        Edit
                    </a>
                    <a href={`/view/${task.id}`} className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                        View Details
                    </a>
                </div>
            </li>
        ))}
    </ul>
</div>

    );
};

export default TaskList;
