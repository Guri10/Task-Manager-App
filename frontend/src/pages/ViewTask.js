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
        return <p>Loading task...</p>;
    }

    return (
        <div>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>Priority: {task.priority}</p>
            <p>Status: {task.status}</p>
            <p>Due Date: {task.due_date}</p>
        </div>
    );
};

export default ViewTask;
