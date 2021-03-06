const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const socket = socketIO(server);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});

app.use(express.static(__dirname));

app.use((req, res, next) => {
  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  }
  else {
    next();
  }
});

app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));
app.use((err, req, res, next) => {
  res
    .status(500)
    .render('error', { 
      error: err
    });
});

app.use((req, res, next) => {
  req.socket = socket;
  next();
});

app.use('/api/v1', require('./api/v1'));

socket.on('connection', socket => {
  console.log('connected');
});