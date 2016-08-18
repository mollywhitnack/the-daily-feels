<<<<<<< HEAD
const express = require('express')
const router = express.Router();
const Articles = require('../db/Articles');
=======
'use strict';

const express = require('express')
const router = express.Router();
const Articles = require('../db/Articles');

>>>>>>> 045307efeb473402f7e4ec30509044fe77a9b21f

router.get('/:searchTerm', (req, res) => {
  Articles.get(req.params.searchTerm)

    .then(articlesToSend => {
      res.send(articlesToSend);
    })
    .catch(err => res.status(400).send(err));
});

module.exports = router;
<<<<<<< HEAD
=======

>>>>>>> 045307efeb473402f7e4ec30509044fe77a9b21f
