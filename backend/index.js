const express = require('express');
const app = express();
const mysql = require('mysql')

const db = mysql.createConnection({
user:'root',
host:'localhost',
password:'password',
database:'IMS'
})


app.listen(3001, ()=> {
    console.log("server running at port 3001")
})

app.post('/create', (req, res)=>{
    const name = req.body.project_name;
    const description = req.body.project_description;

    db.query(
        "INSERT INTO project(name, description) VALUES(?,?)", 
        [name, description], (err, result)=>{
            if(err){
                console.log(err)
            } else{
                res.send("values sent to db")
            }
        }
        )

})