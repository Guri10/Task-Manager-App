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
        <div>
            <h2>Task List</h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <strong>{task.title}</strong> - {task.status}
                        <button onClick={() => handleDelete(task.id)}>Delete</button>
                        
                        {/* Add Edit button */}
                        <button>
                            <a href={`/edit/${task.id}`} style={{ textDecoration: "none" }}>
                                Edit
                            </a>
                        </button>
                        
                        {/* Add View Details button */}
                        <button>
                            <a href={`/view/${task.id}`} style={{ textDecoration: "none" }}>
                                View Details
                            </a>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
