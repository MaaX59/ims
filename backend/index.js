const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const router = express.Router();


const FRONTEND_URL = process.env.ORIGIN || "http://localhost:3000";

app.use(
  cors({
    origin: [FRONTEND_URL],
  })
);
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

// start a project
app.post("/create_project", (req, res) => {
  const project_name = req.body.project_name;
  const project_description = req.body.project_description;
  console.log(`created `, project_name);

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

// add item to project
app.post("/add_item", (req, res) => {
  const item_name = req.body.item_name;
  const item_location = req.body.item_location;
  const item_amount = req.body.item_amount;
  const item_description = req.body.item_description;
  const item_projectid = req.body.item_projectid;

  console.log(`created `);

  db.query(
    "INSERT INTO item(item_name, item_location, item_amount, item_description , item_projectid) VALUES(?,?,?,?,?)",
    [item_name, item_location, item_amount, item_description, item_projectid],
    (err, result) => {
      if (err) {
        console.log(`error when sending to db`, err);
      } else {
        res.send("item sent to db");
      }
    }
  );
});

// list all the projects
app.get("/getprojectlist", (req, res) => {
  db.query("SELECT * FROM project", (error, data) => {
    if (error) {
      console.log(`error when getting projects from db`, error);
    } else {
      res.send(data);
    }
  });
});

//get items
app.get("/getitems", (req, res) => {
  db.query("SELECT * FROM item ", (error, data) => {
    if (error) {
      console.log(`error when getting projects from db`, error);
    } else {
      res.send(data);
    }
  });
});

//update an item
app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const item_name = req.body.item_name;
  const item_description = req.body.item_description;
  const item_location = req.body.item_location;
  const item_amount = req.body.item_amount;
  const item_projectid = req.body.item_projectid;
  db.query(
    "UPDATE item SET item_name = ?, item_description= ?, item_location= ?, item_amount= ?, item_projectid= ? WHERE id= ?",
    [item_name, item_description, item_location, item_amount, item_projectid, id],
    (error, data) => {
      error ? console.log("error updating item",error):
      res.status(200).json({ message: "item updated successfully" });
    }
  );
});
//delete project
app.delete("/delete_project/:project_id", (req, res) => {
  db.query(
    "DELETE FROM project WHERE id = ?",
    +req.params.project_id,
    (error, data) => {
      res.status(200).json({ message: "project deleted successfully" });
    }
  );
});

//delete item
app.delete("/delete_item/:itemid", (req, res) => {
  const { id } = req.params.itemid;
  // console.log("delete item req params",req.params.itemid);

  db.query(
    "DELETE FROM item WHERE id = ?",
    +req.params.itemid,
    (error, data) => {
      res.status(200).json({ message: "item deleted successfully" });
      // console.log("Number of records deleted: " + data.affectedRows);
    }
  );
});

//delete items based on project
app.delete("/delete_items/:projectid", (req, res) => {
  const { id } = req.params.projectid;
  console.log("delete items req params",req.params.id);

  db.query(
    "DELETE FROM item WHERE item_projectid = ?",
    +req.params.projectid,
    (error, data) => {
      res.status(200).json({ message: "item deleted successfully" });
      // console.log("Number of records deleted: " + data.affectedRows);
    }
  );
});

// dont remember if this code does anything
app.get("/project/:id", (req, res) => {
  try {
    const { id } = req.params;

    // the following code works but can be "infected", should use db.escape(id) but throws error//
    db.query("SELECT * FROM project WHERE id = ?", +id, (error, data) => {
      if (error) {
        console.log(error, "error getting specific project from db");
      } else {
        const test = JSON.parse(JSON.stringify(data[0]));
        // const name =  data[0].project_name;
        // const description = data[0].project_description;
        // const projectId = data[0].id;
        console.log(test);
        // res.status(200).json({test});
        res.send(test);
      }
    });
  } catch (error) {
    console.log("error while getting project if from req params", error);
  }
});
