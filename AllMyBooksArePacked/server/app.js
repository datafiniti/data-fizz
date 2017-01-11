const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const router = express.Router();
const app = express();
const scrape = require('./routes/scrape.js')

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(scrape);


  // 404 catcher
  app.use((req, res, next) => {
    let err = new Error(`404: ${req.originalUrl} Not Found`);
    err.status = 404;
    next(err);
  });

  app.use((err, req, res, next) => {
    res.status(500).send({
      message: err.message,
      error: err
    });
  });

  const port = process.env.PORT || 3000;
  const server = app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
  });
  
module.exports = app;