const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Lilydog1',
    database: 'employee_db'
},
    console.log(`Connection successful.`)
);

module.exports = db;