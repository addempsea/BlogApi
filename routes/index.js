var express = require('express');
var router = express.Router();
const controllerx = require('../controllers/user');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.status(200).json({
        message: 'Welcome to our  Blog API'
    });
});

router.post('/login', controllerx.login);
router.post('/signup', controllerx.signup);
router.get('/total', controllerx.total);
router.put('/updateuser/:id', controllerx.updateUser);

module.exports = router;