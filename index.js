const express = require("express");
const cors = require("cors")
const mysql = require("mysql2")
const path = require("path")
const app = express()

const PORT = 3000;

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname + "/static")))

const sql = mysql.createPool({
    host : "localhost",
    user : "root",
    password : "password",
    database : "forms",
}).promise();

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/static/index.html")
})

app.get("/get-Posts",async(req,res)=>{
    const query = "select * from forms";
    const [output] = await sql.query(query);
    res.send(output)
})

app.post("/postData", async(req,res) => {
    const phoneNumber = req.body.phoneNumber;
    const email = req.body.email;
    const query = "insert into forms(phoneNumber,email) values(?,?)";
    await sql.query(query,[phoneNumber,email]);
    console.log("POSTED SUCCESSFULLY");

})


app.listen(PORT, ()=> {
    console.log(`Listening to the PORT : ` + PORT);
})