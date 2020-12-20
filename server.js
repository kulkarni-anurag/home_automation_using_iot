const express = require('express');
const app = express();
const server = require('http').Server(app);
const cors = require('cors');
const io = require('socket.io')(server); 

require('dotenv').config();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.set('view engine', 'ejs');
app.set(express.static('public'));

app.get('/', (req,res) => {
  res.render('index');
});

io.on('connection', function (socket) {

  console.log('user connected');

  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
  
  app.post('/request', (req,res) => {
	const state = Number(req.body.state);
    res.json(state);
	io.emit('state', state);
    console.log(state);
  });
  
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
})