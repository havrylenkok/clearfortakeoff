var express = require('express');
var router = express.Router();

router.get('/test',  require('./../controllers/testController').main);
router.get('/', require('./../controllers/mainController').home);

module.exports = router;
