// Module dependencies.
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const security = require('./security');

module.exports = function(app) {
  app.enable('trust proxy');
  app.use(bodyParser.json({ limit: '1mb' }));

  // This is only loaded when running in Bluemix.
  if (process.env.VCAP_APPLICATION) {
    security(app);
  }

  app.use(express.static(path.join(__dirname, '..', 'build')));
  app.use(morgan('dev'));
};
