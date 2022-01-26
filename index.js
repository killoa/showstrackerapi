
const express = require('express')
const app = express()
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { application } = require('express');
const db = mysql.createConnection({
user: "node",
host: "localhost",
password:"kadhe123",
database: "showstracker"
});
app.get('/', (req,res) => {
  res.send('Welcome!')
})
app.use(cors());
app.use(express.json());

app.listen(3001, ()=> {console.log("server is running")})

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
  app.get('/posts', authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name))
  })
  
  function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      console.log(err)
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
  }
  
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

  app.post('/auth', function(request, response) {
    var username = request.body.username;
    var password = request.body.password;
    if (username && password) {
      connection.query('SELECT * FROM user WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
        if (results.length > 0) {
          request.session.loggedin = true;
          request.session.username = username;
          response.redirect('/shows');
        } else {
          response.send('Incorrect Username and/or Password!');
        }			
        response.end();
      });
    } else {
      response.send('Please enter Username and Password!');
      response.end();
    }
  });
  app.post("/register", (req, res) => {
    
    const username = req.body.username;
    const password = req.body.password;
    
  
    
    db.query(
      "INSERT INTO user (username,password) VALUES (?,?)",
      [username,password],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Values Inserted");
        }
      }
    );
  });