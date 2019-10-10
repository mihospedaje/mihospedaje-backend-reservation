'use strict';

const express = require('express');
const bodyParser = require('body-parser')
const morgan = require('morgan')
const path = require('path');
const app = express();
const cors = require('cors');
const helmet = require('helmet');

const corsOptions = {
    exposedHeaders: ['X-Auth', 'X-Total-Pages', 'X-Current-Page', 'X-Next-Page', 'X-Prev-Page', 'X-Total-Records'],
    origin: '*',
    methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE'],
    preflightContinue: false,
    optionsSuccessStatus: 204
}

// Middleware
app.use(cors(corsOptions));
app.use(helmet());
app.use(bodyParser.json());
app.use(morgan('dev'));

// Import routes
const healthcheck = require('./routes/healthcheck');
const reservation = require('./routes/reservation')(app);

// Implement routes
app.use('/api/v1', healthcheck);

// Start server
const PORT = process.env.PORT || 3010;
const server = app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`);
});

module.exports = {
    server
}
