import express from "express";
import mysql from "mysql";
import cors from "cors";
import dotenv from "dotenv";

const app = express();

dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_MYSQL_PORT //mysql server port
});

app.use(express.json()); //express server middleware : allows us to send any json file using a client
app.use(cors());

app.get("/", (req, res) => {
    res.json("Hello this is a response to backend");
})

app.get("/students",  (req, res) => {
    const q = "SELECT * FROM students";
    db.query(q, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get("/students/:id", (req, res) => {
    const q = "SELECT * FROM students WHERE id = ?";
    const id = req.params.id;
    db.query(q, [id], (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
});

app.post("/students", (req, res) => {
    const q = "INSERT INTO students(`name`, `phone`, `school`, `class`, `roll`, `address`) VALUES(?)";
    const values = [
        req.body.studentName, 
        req.body.phone, 
        req.body.school, 
        req.body.studentClass, 
        req.body.roll, 
        req.body.address
    ];

    db.query(q, [values], (err, result) => {
        if(err) return res.json(err);
        return res.json({ id: result.insertId, message: "Student data is stored successfully!" });
    })
})

app.listen(process.env.DB_EXPRESS_PORT, () => { //express server port
    console.log("Connected to backend!");
})