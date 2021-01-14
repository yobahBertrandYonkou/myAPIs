//including required modules
var mysqldb = require('./db-connection')
var url = require('url')
var express =  require('express')
var cors = require('cors')

//initializing express
const app = express()

//enabling cors
app.use(cors())

//receiving, processing and responding requests
app.get('/',(req, res)=>{
        //getting query string from request
        var query = url.parse(req.url).query

        //checks whether query string is null
        if(query == null){
            console.log("\nQuery string is null\n")
        }else{
            //processes query string  to get actual query
            query = query.replace(/%20/gi, " ")
                         .replace("sql=", "")
                         .replace(/%27/gi, "\'")
                         .replace(/%22/gi, "\"")
    
            //printing query to console
            console.log(`\nSQL: ${query}`)
    
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
            })
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

