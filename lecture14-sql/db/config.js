import mysql from 'mysql2/promise'

const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'557621262',
    database:'lesson'
})
export default pool