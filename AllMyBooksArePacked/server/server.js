const express = require('express');
const app = express();
const path = require('path')
const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, 'data')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(3000);