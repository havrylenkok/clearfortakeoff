var express = require('express');
var router = express.Router();

router.get('/fakeview', require('./../controllers/fakeViewController').main);
router.get('/dbtest', require('./../controllers/dbController').main);
router.get('/test',  require('./../controllers/testController').main);
router.get('/', require('./../controllers/mainController').home);
router.post('/',  require('./../controllers/mainController').home);
    //function(req, res) {
    //console.log(req.body);
    //console.log('req received');
    //res.redirect('/');
//});
module.exports = router;
