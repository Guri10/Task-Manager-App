import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import { getTasks } from "../api";

const EditTask = () => {
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
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-xl">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Edit Task</h2>
                <TaskForm task={task} isEditing={true} />
            </div>
        </div>
    );
};

export default EditTask;
