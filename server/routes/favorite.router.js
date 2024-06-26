const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// return all favorite images
router.get('/', (req, res) => {
  res.sendStatus(200);
});

// add a new favorite
router.post('/', (req, res) => {
  const qText = `INSERT into "favorites"
                ("name","url")
                VALUES ($1, $2);`;
  const favoritesValues = [
    req.body.name,
    req.body.url
    ];
  pool.query(qText, favoritesValues).then((r) => {
    res.sendStatus(201);
  }).catch((e) => {
    console.log('Error in POST request: favorites', e)
  })
});

// update a favorite's associated category
router.put('/:id', (req, res) => {
  // req.body should contain a category_id to add to this favorite image
  res.sendStatus(200);
});

// delete a favorite
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const queryText = `
    DELETE FROM "favorites"
    WHERE "id" = $1;
  `;
  pool
    .query(queryText, [id])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("Error in delete favorites:", error);
      res.sendStatus(500);
    })
});

module.exports = router;
