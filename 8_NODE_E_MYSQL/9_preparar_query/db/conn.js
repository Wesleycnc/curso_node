const mysql = require('mysql')

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'wesley08',
    database: 'nodemysql',
})

module.exports = pool