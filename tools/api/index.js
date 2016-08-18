<<<<<<< HEAD
const express = require('express')
const router = express.Router();

const articles =require('./articles');

router.use('/articles', articles);

module.exports = router;
=======
'use strict';

const express = require('express')
const router = express.Router();

const articles = require('./articles');

router.use('/articles', articles);

module.exports = router;
>>>>>>> 045307efeb473402f7e4ec30509044fe77a9b21f
