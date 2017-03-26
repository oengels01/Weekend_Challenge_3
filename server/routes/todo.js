
var express = require('express');
var router = express.Router();
var pg = require('pg');

var config = {
  database: 'chi',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000
};

var pool = new pg.Pool(config);

router.get('/', function(req, res){
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.send(500);
    } else {

      db.query('SELECT * FROM todo;', function(queryError, result){
        if(queryError) {
          console.log('Error making query.');
          res.send(500);
        } else {
          console.log(result);
          res.send(result.rows);
        }
      });
    }
  });
});

router.post('/add', function(req, res){
  console.log(req.body);
  var task = req.body.task;
  var complete = req.body.complete;

  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.send(500);
    } else {

      db.query('INSERT INTO "todo" ("task", "complete")' +
               ' VALUES ($1,$2);',
               [task, complete], function(queryError, result){
        done();
        if(queryError) {
          console.log('Error making query.');
          res.send(500);
        } else {
          res.sendStatus(201);
        }
      });
    }
  });
});
router.put('/edit', function(req, res){
  console.log(req.body);
  var task = req.body.task;
  var complete = req.body.complete;
  var id = req.body.id;

  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.send(500);
    } else {
      db.query('UPDATE "todo" SET "task" = $1, "complete" = $2 WHERE "id" = $3',

               [task, complete, id], function(queryError, result){
        done();
        if(queryError) {
          console.log('Error making query.');
          res.send(500);
        } else {
          res.sendStatus(201);
        }
      });
    }
  });
});
router.delete('/delete/:id', function(req, res){
  console.log(req.params);
  var id = req.params.id;
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.send(500);
    } else {
      db.query('DELETE FROM "todo" WHERE "id" = $1',
               [id], function(queryError, result){
        done();
        if(queryError) {
          console.log('Error making query.');
          res.send(500);
        } else {
          res.sendStatus(201);
        }
      });
    }
  });
});

module.exports = router;
