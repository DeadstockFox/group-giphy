const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

router.get('/', (req, res) => {
  const queryText = `
    SELECT * FROM "categories"
      ORDER BY "name" ASC;
  `;
  pool.query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(`Error on query ${error}`);
      res.sendStatus(500);
    });
});

// Add multiple categories
router.post("/", (req, res) => {
  const favoriteId = req.body.favorite; // id of associated favorite
  const categoryIds = req.body.categories; // This will be an array of category ids
  const queryText = `
    INSERT INTO "favorites_categories" ("favorite_id", "category_id")
    SELECT $1, unnest($2::int[]);
  `;
  const values = [favoriteId, categoryIds];
  pool  
    .query(queryText, values)
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log("Error in Join Table Post:",error);
      res.sendStatus(500);
    })
})

module.exports = router;
