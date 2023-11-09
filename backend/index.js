const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const router = express.Router();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "project",
});



app.listen(3001, () => {
  console.log("server running at port 3001");
});

app.post("/create_project", (req, res) => {
  const project_name = req.body.project_name;
  const project_description = req.body.project_description;
  console.log(`info in the backend`, project_name);

  db.query(
    "INSERT INTO project(project_name, project_description) VALUES(?,?)",
    [project_name, project_description],
    (err, result) => {
      if (err) {
        console.log(`error when sending to db`, err);
      } else {
        res.send("values sent to db");
      }
    }
  );
});

app.get("/getprojectlist", (req, res) => {
  db.query("SELECT * FROM project", (error, data) => {
    if (error) {
      console.log(`error when getting projects from db`, error);
    } else {
      res.send(data);
    }
  });
});

app.get("/project/:id", (req, res) => {
  try{
    console.log('test',req.params);
  const { id } = req.params;

  db.query("SELECT * FROM project WHERE id = 1", (error, data) => {
    if (error) {
      console.log(error, "error getting specific project from db");
    } else {
      console.log(data);
      res.send(data);
    }
  });
  }
  catch(error){
    console.log('error while getting project if from req params', error)
  }
  
});
