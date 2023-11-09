const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const router = express.Router();

const FRONTEND_URL = process.env.ORIGIN || "http://localhost:3000";

app.use(cors({
  origin: [FRONTEND_URL]
}));
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
  try {
    const { id } = req.params;

// the following code works but can be "infected", should use db.escape(id) but throws error//
    db.query("SELECT * FROM project WHERE id = ?", + id, (error, data) => {
      if (error) {
        console.log(error, "error getting specific project from db");
      } else {
        const test = JSON.parse(JSON.stringify(data[0]))
        const name =  data[0].project_name;
        const description = data[0].project_description;
        const projectId = data[0].id;
         console.log(test)
        // res.status(200).json({test});
        res.send(test)
      }
    });
  } catch (error) {
    console.log("error while getting project if from req params", error);
  }
});
