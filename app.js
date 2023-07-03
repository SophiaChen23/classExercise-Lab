const express = require('express');
const routes = require('./routers/index');

const app = express();
app.use('/', routes);

module.exports = app;
