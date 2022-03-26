// app.js file
const express = require('express');
const apiRouter = require('./routes');
// Returns an Express server
const app = express();

app.use(express.json());

app.use('/', apiRouter);

app.listen(3000);



// Set default middlewares (logger, static, cors and no-cache)
// server.use(jsonServer.defaults());

// Add custom routes
// server.get('/custom', function (req, res) { res. })

// Returns an Express router
//var router = jsonServer.router('db.json');
//server.use(router);
//server.listen(3000);