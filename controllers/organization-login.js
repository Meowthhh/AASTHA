var mysql =require('mysql');
var express = require ('express');
var cookie = require ('cookie-parser');
var db = require('../config/dbconfig');
var router = express.Router();


router.get('/',function(req,res){
    res.render('organization-login.ejs');
});

module.exports = router;