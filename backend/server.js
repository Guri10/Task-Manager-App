const express = require("express");
const cors = require("cors"); // Import CORS middleware
const pool = require("./config/db"); // Use the connection pool
const taskRoutes = require("./routes/taskRoutes");

const app = express();

// ✅ Enable CORS to allow requests from frontend
app.use(cors({
    origin: "*", // Allow requests from any origin
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));

// Middleware
app.use(express.json());

// Root Route
app.get("/", (req, res) => {
    res.send("Task Manager API is running!");
});

// test connection
app.get("/test-db", async (req, res) => {
    try {
        const results = await pool.query("SELECT NOW();"); // Test query for PostgreSQL
        res.json({ message: "✅ Database connected successfully!", time: results.rows[0] });
    } catch (err) {
        console.error("❌ Error querying databases:", err);
        res.status(500).send({
            error: "Error connecting to the database",
            details: err.message,
        });
    }
});



// Task Routes
app.use("/tasks", taskRoutes);

// Start the Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
