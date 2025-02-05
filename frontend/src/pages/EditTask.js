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
        return <p>Loading task...</p>;
    }

    return (
        <div>
            <TaskForm task={task} isEditing={true} />
        </div>
    );
};

export default EditTask;
