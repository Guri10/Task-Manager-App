const pool = require("../config/db"); // Use the correct PostgreSQL pool

// ✅ Get all tasks
exports.getAllTasks = async (req, res) => {
    try {
        const results = await pool.query("SELECT * FROM tasks;");
        res.json(results.rows); // Use `.rows` for PostgreSQL
    } catch (err) {
        console.error("Error fetching tasks:", err);
        res.status(500).send("Failed to fetch tasks.");
    }
};

// ✅ Get a single task by ID
exports.getTaskById = async (req, res) => {
    const { id } = req.params;
    try {
        const results = await pool.query("SELECT * FROM tasks WHERE id = $1", [id]);
        if (results.rows.length === 0) {
            return res.status(404).send("Task not found.");
        }
        res.json(results.rows[0]);
    } catch (err) {
        console.error("Error fetching task:", err);
        res.status(500).send("Failed to fetch task.");
    }
};

// ✅ Create a new task
exports.createTask = async (req, res) => {
    const { title, description, priority, due_date } = req.body;
    try {
        const results = await pool.query(
            "INSERT INTO tasks (title, description, priority, due_date) VALUES ($1, $2, $3, $4) RETURNING id;",
            [title, description, priority, due_date]
        );
        res.json({ id: results.rows[0].id, message: "Task created successfully!" });
    } catch (err) {
        console.error("Error creating task:", err);
        res.status(500).send("Failed to create task.");
    }
};

// ✅ Update a task by ID
exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, priority, status, due_date } = req.body;
    try {
        const results = await pool.query(
            "UPDATE tasks SET title = $1, description = $2, priority = $3, status = $4, due_date = $5 WHERE id = $6 RETURNING *;",
            [title, description, priority, status, due_date, id]
        );
        if (results.rowCount === 0) {
            return res.status(404).send("Task not found.");
        }
        res.json({ message: "Task updated successfully!" });
    } catch (err) {
        console.error("Error updating task:", err);
        res.status(500).send("Failed to update task.");
    }
};

// ✅ Delete a task by ID
exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const results = await pool.query("DELETE FROM tasks WHERE id = $1 RETURNING *;", [id]);
        if (results.rowCount === 0) {
            return res.status(404).send("Task not found.");
        }
        res.json({ message: "Task deleted successfully!" });
    } catch (err) {
        console.error("Error deleting task:", err);
        res.status(500).send("Failed to delete task.");
    }
};
