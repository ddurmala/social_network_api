// require('dotenv').config();

const express = require('express');

const db = require('./config/connection');

// const api_routes = require('./routes/api_routes');

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());

// app.use('/api', api_routes);

db.once('open', () => {
    console.log('db connection est.')
    // ...start express server
    app.listen(PORT, () => {
        console.log('server started on', PORT)
    });
})