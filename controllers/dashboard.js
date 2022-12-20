var express = require('express');
// var home = require('./home');
var mysql = require('mysql');
var session = require('express-session');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('../config/dbconfig');
var sweetalert = require('sweetalert2');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs")

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('*', function (req, res, next) {
    if (req.cookies['email'] == null) {
        res.redirect('/login');
    } else {
        next();
    }
});

router.get('/', function (req, res) {

    // console.log(req.cookies['email']);
    email = req.cookies['email'];
    console.log(email);
    db.query("SELECT * FROM `user_info` where email=?", [email], async (err, result) => {
        console.log(result);
        res.render('dashboard.ejs',{username : result[0].fname});
    })
});

module.exports = router;