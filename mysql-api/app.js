//including required modules
var mysqldb = require('./db-connection')
var url = require('url')
var express =  require('express')
var cors = require('cors')
const { type } = require('os')

//initializing express
const app = express()

//enabling cors
app.use(cors());

//query executor

var queryExecutor = (query, res) => {
    //executing query
    mysqldb.query(query, (error, result)=>{
        if(error){
            //formatting error
            var err = {
                code: error.code,
                errno: error.errno,
                sqlMessage: error.sqlMessage,
                sqlSate: error.sqlState,
                index: error.index,
                sql: error.sql
            }

            //printing error
            console.error(err);

            //returning error message to client
            //res.writeHead(200, {"content-type": "text/html"})
            res.send(err.sqlMessage)
        }else{
            //prints result
            console.log(result)

            //returning data to client
            //res.writeHead(200, {"content-type": "text/html"})
            res.send(JSON.stringify(result))
        }
    });
}

//receiving, processing and responding to requests related to login
app.get('/login', (req, res)=>{
    //geting users credentials
    var credentails = req.query;

    //extracts password and email from query
    var email = credentails['email'];
    var password = credentails['password'];

    //login query
    var query = `select * from users where email='${email}' and password='${password}'`;

    //executing query
    queryExecutor(query, res);

    
});

//receiving, processing and responding to requests related to database
app.get('/database',(req, res)=>{

        //url.parse is deprecated
        // getting query string from request
        // var query = url.parse(req.url).query

        //getting query string from request
        var query = req.query;

        console.log(typeof(query))

        //checks whether query string is not present or query string is null
        if(Object.keys(query).length == 0 || query['sql'] == ""){
            console.log("\nQuery string is null\n")
        }else{
            // processes query string  to get actual query
            // query = query.replace(/%20/gi, " ")
            //              .replace("sql=", "")
            //              .replace(/%27/gi, "\'")
            //              .replace(/%22/gi, "\"")
    
            //printing query to console
            console.log(`\nSQL: ${query["sql"]}`)
    
            //executes query and reply back to client
            queryExecutor(query, res);
        }
})
//create server
app.listen(80, (err)=>{
    if(err){
        throw err
    }else{
        console.log("Started server with cors enabled")
    }

    
})

