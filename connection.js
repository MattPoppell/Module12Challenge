const mysql = require('mysql2');

// This is the database connection.
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Lilydog1',
    database: 'employee_db'
},
    console.log(`Connection successful.`)
);

module.exports = db;