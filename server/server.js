const express = require('express');
const app = express();
const favoriteRouter = require('./routes/favorite.router');
const categoryRouter = require('./routes/category.router');
const PORT = process.env.PORT || 5001;
const axios = require('axios');

// adding environment variable
require('dotenv').config()

/** ---------- MIDDLEWARE ---------- **/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('build'));

/** ---------- EXPRESS ROUTES ---------- **/
app.use('/api/favorites', favoriteRouter);
app.use('/api/categories', categoryRouter);
// Adding GET route to GIPHY API
app.get('/api', (req, res) => {
  axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${search_term}&limit=1&offset=7&rating=g&lang=en&bundle=messaging_non_clips`)
  .then((response) => {
    console.log('Response from the Giphy API:', response.data);
    res.send(response.data);
  }).catch((error) => {
    console.log('Error response from the Giphy API:', error);
    res.sendStatus(500);
  })
})

/** ---------- START SERVER ---------- **/
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
