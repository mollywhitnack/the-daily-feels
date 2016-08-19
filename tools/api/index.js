const express = require('express')
const router = express.Router();


const articles =require('./articles');


router.use('/articles', articles);





module.exports = router;