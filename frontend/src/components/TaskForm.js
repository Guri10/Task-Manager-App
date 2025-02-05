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
        <form onSubmit={handleSubmit}>
            <h2>{isEditing ? "Edit Task" : "Create Task"}</h2>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task Title"
                required
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Task Description"
            ></textarea>
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
            </select>
            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                placeholder="Due Date"
            />
            <button type="submit">{isEditing ? "Update Task" : "Add Task"}</button>
        </form>
    );
};

export default TaskForm;
