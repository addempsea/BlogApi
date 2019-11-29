var express = require('express');
var router = express.Router();
var blog = require('../controllers/blog');
var user = require('../controllers/users');
var auth = require('../middleware/token')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', user.signup);
router.post('/login', user.login);


router.post('/create', auth, blog.blogEntry);
router.put('/edit/:id', auth, blog.blogUpdate);
router.get('/posts', auth, blog.blogDisplay);
router.get('/post/:id', auth, blog.blogDisplayOne);
router.delete('/create', auth, blog.blogDelete);

module.exports = router;