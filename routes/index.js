var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
router.use(bodyParser.json());

/* GET home page. */
router.get('/', function(req, res, next) {
   
});

module.exports = router;
