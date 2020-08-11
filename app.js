'use strict';

const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('common'));


const apps = require('./playstore.js');

app.get('/apps', (req, res) => {
    const { sort, genres } = req.query;

    let sortedApps = [...apps];
    sortedApps.map(app => {
        return app['App'].toLowerCase()
    });

    const sortVals = ['Rating', 'App'];

    if(sort) {
        if(!sortVals.includes(sort)) {
            res.status(400).send('Please send only a "rating" or "app"');
        }
        sortedApps.sort((a, b) => {
            if (a[sort] < b[sort]) {
                return -1;
            } else if (a[sort] > b[sort]) {
                return 1;
            } else {
                return 0;
            }
        });
    }

    const genreVals = ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'];

    if(genres) {
        if(!genreVals.includes(genres)) {
            res.status(400).send('Please send a valid genre');
        }
        sortedApps = sortedApps.filter(app => app["Genres"] === genres);
    }

    res.json(sortedApps);

});

app.listen(8000, () => {
    console.log('Server started on PORT 8000');
});