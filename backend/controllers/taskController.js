const connection = require("../config/db");

// Get all tasks
exports.getAllTasks = (req, res) => {
    connection.query("SELECT * FROM tasks", (err, results) => {
        if (err) {
            console.error("Error fetching tasks:", err);
            return res.status(500).send("Failed to fetch tasks.");
        }
        res.json(results);
    });
};

// Get a single task by ID
exports.getTaskById = (req, res) => {
    const { id } = req.params;
    connection.query("SELECT * FROM tasks WHERE id = ?", [id], (err, results) => {
        if (err) {
            console.error("Error fetching task:", err);
            return res.status(500).send("Failed to fetch task.");
        }
        if (results.length === 0) {
            return res.status(404).send("Task not found.");
        }
        res.json(results[0]);
    });
};

// Create a new task
exports.createTask = (req, res) => {
    const { title, description, priority, due_date } = req.body;
    connection.query(
        "INSERT INTO tasks (title, description, priority, due_date) VALUES (?, ?, ?, ?)",
        [title, description, priority, due_date],
        (err, results) => {
            if (err) {
                console.error("Error creating task:", err);
                return res.status(500).send("Failed to create task.");
            }
            res.json({ id: results.insertId, message: "Task created successfully!" });
        }
    );
};

// Update a task by ID
exports.updateTask = (req, res) => {
    const { id } = req.params;
    const { title, description, priority, status, due_date } = req.body;
    connection.query(
        "UPDATE tasks SET title = ?, description = ?, priority = ?, status = ?, due_date = ? WHERE id = ?",
        [title, description, priority, status, due_date, id],
        (err, results) => {
            if (err) {
                console.error("Error updating task:", err);
                return res.status(500).send("Failed to update task.");
            }
            if (results.affectedRows === 0) {
                return res.status(404).send("Task not found.");
            }
            res.json({ message: "Task updated successfully!" });
        }
    );
};

// Delete a task by ID
exports.deleteTask = (req, res) => {
    const { id } = req.params;
    connection.query("DELETE FROM tasks WHERE id = ?", [id], (err, results) => {
        if (err) {
            console.error("Error deleting task:", err);
            return res.status(500).send("Failed to delete task.");
        }
        if (results.affectedRows === 0) {
            return res.status(404).send("Task not found.");
        }
        res.json({ message: "Task deleted successfully!" });
    });
};
