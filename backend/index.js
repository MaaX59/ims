const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors")

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "1234",
  database: "project",
});

app.listen(3001, () => {
  console.log("server running at port 3001");
});

app.post("/create_project", (req, res) => {
  const project_name = req.body.project_name;
  const project_description = req.body.project_description;
  console.log(`info in the backend`,project_name);

  db.query(
    "INSERT INTO project(name, description) VALUES(?,?)",
    [project_name, project_description],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("values sent to db");
      }
    }
  );
});
