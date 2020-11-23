//Libraries
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

//Custom routes
const get = require('./get');
const post = require('./post');

const PORT = 3000;
const app = express();
dotenv.config();

mongoose.connect(
  process.env.DATABASE,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('Connected to database')
)

//Routes
app.use(express.json());
app.use(cors());
app.use('/get', get);
app.use('/post', post);

app.listen(PORT, console.log(`Now listeningon ${PORT}`))
