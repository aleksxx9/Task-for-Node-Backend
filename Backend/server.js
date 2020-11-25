//Libraries
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

//Custom routes
const get = require('./get');
const post = require('./post');

const PORT = process.env.PORT || 3000;
const app = express();
dotenv.config();

const connect = () => {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === 'test') {
      const Mockgoose = require('mockgoose').Mockgoose;
      const mockgoose = new Mockgoose(mongoose);
      mockgoose.prepareStorage()
        .then(() => {
          mongoose.connect(
            process.env.DATABASE,
            { useNewUrlParser: true, useUnifiedTopology: true }, console.log('Succesfully connected to database'))
            .then((res, e) => {
              if (e) return reject(e);
              else return resolve();
            });
        })
    } else {
      mongoose.connect(
        process.env.DATABASE,
        { useNewUrlParser: true, useUnifiedTopology: true }, console.log('Succesfully connected to database'))
        .then((res, e) => {
          if (e) return reject(e);
          else return resolve();
        })
    }
  })
}

//Routes
app.use(express.json());
app.use(cors());
app.use('/get', get);
app.use('/post', post);

connect()
  .then(() => {
    app.listen(PORT, console.log(`Now listening on http://localhost:${PORT}`))
  })

module.exports = { connect, app };