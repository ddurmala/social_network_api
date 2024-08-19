require('dotenv').config();

const express = require('express');

const db = require('./config/connection');

const all_routes = require('./routes/all_routes')

// const api_routes = require('./routes/api_routes');

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());

//load routes
app.use('/api', all_routes);

db.once('open', () => {
    console.log('db connection est.')
    // ...start express server
    app.listen(PORT, () => {
        console.log('server started on', PORT)
    });
})