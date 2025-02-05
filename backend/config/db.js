const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from .env file

// Create a MySQL connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,  // Maximum number of connections in the pool
    queueLimit: 0        // Unlimited queue
});

// Export the pool as a promise
module.exports = pool.promise();
