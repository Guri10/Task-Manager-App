import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTasks } from "../api";

const ViewTask = () => {
    const { id } = useParams();
    const [task, setTask] = useState(null);

    useEffect(() => {
        const fetchTask = async () => {
            const tasks = await getTasks();
            const currentTask = tasks.find((t) => t.id === parseInt(id));
            setTask(currentTask);
        };

        fetchTask();
    }, [id]);

    if (!task) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-lg font-semibold text-gray-600">Loading task...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-xl">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">{task.title}</h2>
                <div className="space-y-4">
                    <p className="text-lg text-gray-700"><strong>Description:</strong> {task.description}</p>
                    <p className="text-lg text-gray-700"><strong>Priority:</strong> {task.priority}</p>
                    <p className="text-lg text-gray-700"><strong>Status:</strong> {task.status}</p>
                    <p className="text-lg text-gray-700"><strong>Due Date:</strong> {task.due_date}</p>
                </div>
            </div>
        </div>
    );
};

export default ViewTask;
