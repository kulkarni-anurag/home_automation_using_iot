const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.set('view engine', 'ejs');

app.get('/', (req,res) => {
	res.render('index');
});

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const conn = mongoose.connection;

conn.once('open', () => {
  console.log("MongoDB Connection established");
});

const devicesRouter = require('./routes/devices');

app.use('/devices', devicesRouter);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});