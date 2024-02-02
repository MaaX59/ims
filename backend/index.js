const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const router = express.Router();
const jwt = require("jsonwebtoken");

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

//single user

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
    [
      item_name,
      item_description,
      item_location,
      item_amount,
      item_projectid,
      id,
    ],
    (error, data) => {
      error
        ? console.log("error updating item", error)
        : res.status(200).json({ message: "item updated successfully" });
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
  console.log("delete items req params", req.params.id);

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

//
//
//
//
// Company
//
//
//
//

//verify jwt
const verifyJwt = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, "jwtKey", (err, decoded) => {
      if (err) {
        res.json("Not Authenticated");
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  } else {
    return res.json("Token was not found");
  }
};
app.get("/verify", verifyJwt, (req, res) => {
  console.log("Payload in middleware", req.payload);
  return res.status(200).json({ user: req.payload });
});

//createuser aka signup -.-
app.post("/createuser", (req, res) => {
  const first_name = req.body.firstName;
  const last_name = req.body.lastName;
  const email = req.body.email;
  const company_id = req.body.companyid;
  const company_password = req.body.companyPassword;
  const password = req.body.password;
  const confirmPassword = req.body.confirmedPassword;
  console.log(req.body);
  try {
    //check if pwds match
    if (password !== confirmPassword) {
      res.send("no pwd match");
    } else {
      //see if email already exist
      db.query(
        "SELECT * FROM users WHERE `email` = ? ",
        [email],
        (err, data) => {
          //if email dosent exist in db, create user
          if (data.length == 0) {
            db.query(
              "INSERT INTO users(first_name, last_name, email, company_id, company_password, password) VALUES(?,?,?,?,?,?)",
              [
                first_name,
                last_name,
                email,
                company_id,
                company_password,
                password,
              ],
              (err, result) => {
                if (err) {
                  console.log(`error when sending to db`, err);
                } else {
                  res.send("User created");
                }
              }
            );
          } else if (data.length > 0) {
            console.log(data);
            res.send("Email already exist");
          }
        }
      );
    }
  } catch (err) {
    console.log("error creating new user", err);
  }
});

// Log In
app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  // console.log(email, password);

  db.query(
    "SELECT * FROM users WHERE `email` = ? ",
    [email],
    // "SELECT * FROM users WHERE `email` = ? AND `password` = ? ",
    // [email, password],
    (err, data) => {
      console.log(data, "<--data");
      data[0] ? console.log(data[0].password, " <-- password from db") : null;
      console.log(password, "<---pwd from form");

      if (err) {
        return res.json("error");
      }
      //check if data exist
      if (data[0]) {
        //check if passwords match
        if (data[0].password === password) {
          const { id, email, first_name, last_name, company_id } = data[0];
          const userInfo = { id, email, first_name, last_name, company_id };
          // const { id } = data[0].id;
          const token = jwt.sign(userInfo, "jwtKey", { expiresIn: "6h" });
          return res.status(200).json({ token, userInfo });
        } else {
          return res.json("no match");
        }
      } else {
        return res.json("no email");
      }
    }
  );
});

//Create Company
app.post("/create_company", (req, res) => {
  const company_name = req.body.companyName;
  const password = req.body.password;
  const confirmPassword = req.body.confirmedPassword;
  const created_by_user_id = req.body.userId;

  try {
    //check if pwds match
    if (password !== confirmPassword) {
      res.send("no pwd match");
    } else {
      //see if company already exist
      db.query(
        "SELECT * FROM company WHERE `company_name` = ? ",
        [company_name],
        (err, data) => {
          //if name dosent exist in db, create company
          if (data.length == 0) {
            db.query(
              "INSERT INTO company(company_name, password, created_by_user_id) VALUES(?,?,?)",
              [company_name, password, created_by_user_id],
              (err, result) => {
                if (err) {
                  console.log(`error when sending company to db`, err);
                } else {
                  //if everything worked well, i´ll add the company id to the user
                  db.query(
                    "UPDATE users SET `company_id` = ? WHERE `id` = ? ",
                    [result.insertId, req.body.userId],
                    (err, data) => {
                      if (err) {
                        console.log(`error when sending company to db`, err);
                      } else {
                        res.send("Company created");
                      }
                    }
                  );
                }
              }
            );
          } else if (data.length > 0) {
            res.send("Name already exist");
          }
        }
      );
    }
  } catch (err) {
    console.log("error creating new company", err);
  }
});

// start a company project
app.post("/create_company_project", (req, res) => {
  const project_name = req.body.project_name;
  const project_description = req.body.project_description;
  const company_id = req.body.company_id;
  const created_by_user_id = req.body.created_by_user_id;
  // console.log(`req.body on backend  `, req.body);

  db.query(
    "INSERT INTO company_project(project_name, project_description, company_id,created_by_user_id) VALUES(?,?,?,?)",
    [project_name, project_description, company_id, created_by_user_id],
    (err, result) => {
      if (err) {
        console.log(`error when sending to db`, err);
      } else {
        res
          .status(200)
          .json({ message: "company project created successfully" });
      }
    }
  );
});

//find company based on id
app.get("/find_company/:company_id", (req, res) => {
  console.log("req params-->", req.params.company_id);

  db.query(
    "SELECT * FROM company WHERE `id` = ? ",
    req.params.company_id,
    (error, data) => {
      if (error) {
        console.log(`error when getting projects from db`, error);
      } else {
        // console.log(data);
        res.send(data);
      }
    }
  );
});

//find company projects
app.get("/get_company_projects/:company_id", (req, res) => {
  // console.log("req params when find projects-->", req.params.company_id);
  const company_id = req.params.company_id;
  db.query(
    "SELECT * FROM company_project WHERE `company_id` = ? ",
    req.params.company_id,
    (error, data) => {
      if (error) {
        console.log(`error when getting projects from db`, error);
      } else {
        // console.log("data from get company projects", data);
        res.send(data);
      }
    }
  );
});

//add items to company project
app.post("/add_company_item", (req, res) => {
  const item_name = req.body.item_name;
  const item_description = req.body.item_description;
  const item_location = req.body.item_location;
  const purchased_from = req.body.purchased_from;
  const purchased_price = req.body.purchased_price;
  const in_stock = req.body.inStock;
  const notes = req.body.notes;
  const item_amount = req.body.item_amount;
  const project_id = req.body.project_id;
  const project_name = req.body.project_name;
  const added_by_user = req.body.added_by_user;
  const company_id = req.body.company_id;
  console.log(`req.body on backend for add items `, req.body);

  db.query(
    "INSERT INTO company_items(item_name, item_description, item_location,purchased_from,purchased_price,in_stock,notes,item_amount,project_id, added_by_user,company_id, project_name) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      item_name,
      item_description,
      item_location,
      purchased_from,
      purchased_price,
      in_stock,
      notes,
      item_amount,
      project_id,
      added_by_user,
      company_id,
      project_name,
    ],
    (err, result) => {
      if (err) {
        console.log(`error when sending to db`, err);
      } else {
        res.send("values sent to db");
      }
    }
  );
});

//find items based on company project

app.get("/get_company_items/:project_id", (req, res) => {
  // console.log("req params when find company project items-->", req.params);
  const project_id = req.params.project_id;
  db.query(
    "SELECT * FROM company_items WHERE `project_id` = ? ",
    project_id,
    (error, data) => {
      if (error) {
        console.log(`error when getting company items from db`, error);
      } else {
        // console.log("data from get company project items", data);
        res.send(data);
      }
    }
  );
});

//find all company items

app.get("/get_all_company_items/:props", (req, res) => {
  console.log(
    "req params when find company project items-->",
    req.params.props
  );
  const company_id = req.params.props;
  db.query(
    "SELECT * FROM company_items WHERE `company_id` = ? ",
    company_id,
    (error, data) => {
      if (error) {
        console.log(`error when getting company items from db`, error);
      } else {
        console.log("data from get company project items", data);
        res.send(data);
      }
    }
  );
});

//delete company item
app.delete("/delete_company_item/:itemId", (req, res) => {
  console.log("delete item req params", req.params.itemId);
  db.query(
    "DELETE FROM company_items WHERE id = ?",
    +req.params.itemId,
    (error, data) => {
      if (error) {
        console.log(`error when deleting item`, error);
      } else {
        res.status(200).json({ message: "item deleted successfully" });
      }

      // console.log("Number of records deleted: " + data.affectedRows);
    }
  );
});

//update company item
app.put("/update_company_item/:item_id", (req, res) => {
  const id = req.params.item_id;
  const item_name = req.body.item_name;
  const item_description = req.body.item_description;
  const item_location = req.body.item_location;
  const item_amount = req.body.item_amount;
  const purchased_from = req.body.purchased_from;
  const purchased_price = req.body.purchased_price;
  const in_stock = req.body.in_stock;
  const notes = req.body.notes;
  const project_id = req.body.project_id;
  const company_id = req.body.company_id;
  console.log("company item id -->", id);

  db.query(
    "UPDATE company_items SET item_name = ?, item_description= ?, item_location= ?, item_amount= ?, project_id= ?, purchased_from= ?,purchased_price= ?, in_stock= ?, notes= ?, company_id =? WHERE id= ?",
    [
      item_name,
      item_description,
      item_location,
      item_amount,
      project_id,
      purchased_from,
      purchased_price,
      in_stock,
      notes,
      company_id,
      id,
    ],
    (error, data) => {
      error
        ? console.log("error updating item", error)
        : res.status(200).json({ message: "item updated successfully" });
    }
  );
});

//update amount at sales
app.put("/update_company_item_sales/:item_id", (req, res) => {
  const id = req.params.item_id;
  const amount_left = req.body.amount_left;
  console.log("req body -->", req.body.amount_left);
  console.log("company item_amout left -->", req.body.amount_left);

  db.query(
    "UPDATE company_items SET item_amount= ? WHERE id= ?",
    [amount_left, id],
    (error, data) => {
      error
        ? console.log("error updating item", error)
        : res.status(200).json({ message: "sales, item updated successfully" });
    }
  );
});

//delete company project
app.delete("/delete_company_project/:project_id", (req, res) => {
  console.log("delete company project, params -->", req.params.project_id);
  db.query(
    "DELETE FROM company_project WHERE id = ?",
    +req.params.project_id,
    (error, data) => {
      if (error) {
        console.log(`error when deleting company project`, err);
      } else {
        res
          .status(200)
          .json({ message: "company project deleted successfully" });
      }
    }
  );
});

//delete company items based on project
app.delete("/delete_company_items/:project_id", (req, res) => {
  // const { id } = req.params.project_id;
  console.log("delete items req params", req.params.project_id);

  db.query(
    "DELETE FROM company_items WHERE project_id = ?",
    +req.params.project_id,
    (error, data) => {
      if (error) {
        console.log(`error when deleting all items from company project`, err);
      } else {
        res.status(200).json({ message: "items deleted successfully" });
        // console.log("Number of records deleted: " + data.affectedRows);
      }
    }
  );
});

//get single item based on id
app.get("/get_single_item_by_id/:props", (req, res) => {
  console.log("req params when get_single_item_by_id-->", req.params);
  const id = req.params.props;
  db.query("SELECT * FROM company_items WHERE `id` = ? ", id, (error, data) => {
    if (error) {
      console.log(`error when getting company item from db`, error);
    } else {
      console.log("data from get company project items", data);
      res.send(data[0]);
    }
  });
});

//
//Log Started
//

//Add Company Project To Log
app.post("/add_company_project_to_log", (req, res) => {
  const data = req.body;
  const company_id = req.body.company_id;
  const string = "Project Created" + JSON.stringify(data);
  db.query(
    "INSERT INTO company_log(company_id, string ) VALUES(?,?)",
    [company_id, string],
    (err, result) => {
      if (err) {
        console.log(`error when sending to db`, err);
      } else {
        res.status(200).json({ message: "company project added to log" });
      }
    }
  );
});

//Add Item To Log
app.post("/add_company_item_to_log", (req, res) => {
  const data = req.body;
  const company_id = req.body.company_id;
  const string = "Item Created" + JSON.stringify(data);
  db.query(
    "INSERT INTO company_log(company_id, string ) VALUES(?,?)",
    [company_id, string],
    (err, result) => {
      if (err) {
        console.log(`error when sending to db`, err);
      } else {
        res.status(200).json({ message: "company project added to log" });
      }
    }
  );
});

//Delete Item To Log
app.delete("/delete_company_item_to_log", (req, res) => {
  const data = req.body;
  const company_id = req.body.company_id;
  const string = "Item Deleted" + JSON.stringify(data);
  console.log("data item deleted added to log", data);
  // db.query(
  //   "INSERT INTO company_log(company_id, string ) VALUES(?,?)",
  //   [company_id, string],
  //   (err, result) => {
  //     if (err) {
  //       console.log(`error when sending to db`, err);
  //     } else {
  //       res.status(200).json({ message: "company project added to log" });
  //     }
  //   }
  // );
});
