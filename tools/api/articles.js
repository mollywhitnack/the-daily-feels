const express = require('express')
const router = express.Router();
const Articles = require('../db/Articles');

router.get('/:searchTerm', (req, res) => {
  Articles.get(req.params.searchTerm)

    .then(articlesToSend => {
      res.send(articlesToSend);
    })
    .catch(err => res.status(400).send(err));
});

module.exports = router;
