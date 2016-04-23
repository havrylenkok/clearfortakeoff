var express = require('express');
var router = express.Router();

router.get('/dbtest', require('./../controllers/dbController').main);
router.get('/test',  require('./../controllers/testController').main);
router.get('/', require('./../controllers/mainController').home);

module.exports = router;
