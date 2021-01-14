//including mysql module
var mysql = require('mysql')

//creating mysql connection parameters
var connection = mysql.createConnection({
    host: 'hostname',
    user: 'username',
    password: 'userpassword',
    database: 'databasename'
})

//establishing mysql connection to server
connection.connect();

//exports mysql connection obj
module.exports = connection