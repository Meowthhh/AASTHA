var express = require('express');
var router = express.Router();

router.get('/', function(req, res){

	//req.session.username = null;
	res.clearCookie('email');
	res.redirect('/login');
});

module.exports = router;
