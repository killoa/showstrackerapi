const express = require('express')
const app = express()
const mysql = require('mysql');
const cors = require('cors')
const db = mysql.createConnection({
user: "node",
host: "localhost",
password:"kadhe123",
database: "showstracker"
});
app.use(cors());
app.use(express.json());
app.post("/create", (req, res) => {
    const name = req.body.name;
    const ep = req.body.ep;
    const rating = req.body.rating;
    
  
    db.query(
      "INSERT INTO shows (name,ep,rating) VALUES (?,?,?)",
      [name, ep, rating],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Values Inserted");
        }
      }
    );
  });
  
  app.get("/shows", (req, res) => {
    db.query("SELECT * FROM shows", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });
  
  app.put("/update", (req, res) => {
    const id = req.body.id;
    const ep = req.body.ep;
    db.query(
      "UPDATE shows SET ep = ? WHERE id = ?",
      [ep, id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });
  
  app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM shows WHERE id = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

app.listen(3001, ()=> {console.log("server is running")})