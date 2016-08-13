var Router = require('express').Router;
var router = Router();

var articles = require('./articles');

router.use('/articles', articles);

module.exports = router;

