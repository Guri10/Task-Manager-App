const express = require("express");
const connection = require("./config/db");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Task Manager API is running!");
});

// Test MySQL connection
app.get("/test-db", (req, res) => {
    connection.query("SHOW DATABASES", (err, results) => {
        if (err) {
            console.error("❌ Error querying databases:", err);
            res.status(500).send("Error connecting to the database");
            return;
        }
        console.log("✅ Databases:", results);
        res.send(results);
    });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
