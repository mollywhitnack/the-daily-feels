var Router = require('express').Router;
var Articles = require('../db/Articles')

var router = Router();

router.get('/:searchTerm', (req, res) => {
  Articles.get(req.params.searchTerm)

    .then(articlesToSend => {
      res.send(articlesToSend);
    })
    .catch(err => res.status(400).send(err));
});

module.exports = router;

