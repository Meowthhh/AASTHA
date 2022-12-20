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

router.get('/:email', (req, res) => {
    const email = req.params.email
    console.log(email);
    db.query("SELECT * FROM user_info WHERE email=?", [email], (err, results) => {
      if (err) {
        console.log(err);
      } else {
        console.log(results);
        res.render('user-profile.ejs', { data: results[0] })
      }
    })
});

module.exports = router;
