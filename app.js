const express = require('express');
const path = require('path');
const routes = require('./routers/index');

const app = express();
const bodyParser = require('body-parser');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));



app.use(bodyParser.urlencoded({extended: true}));
app.use('/', routes);
app.use(express.static('public'));
module.exports = app;




