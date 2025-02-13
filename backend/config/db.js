const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DB_URL, // Use connection string from .env
    ssl: {
        rejectUnauthorized: false, // Required for NeonDB
    },
});

console.log("✅ Connected to PostgreSQL!");

module.exports = pool; // No need for `.getConnection()`, just export `pool`
