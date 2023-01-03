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


router.get('*', function (res, next) {
});

router.get(function (req) {

    // console.log(req.cookies['email']);
    email = req.cookies['email'];
    console.log(email);
    db.query([email], async (err, result) => {
    })
});
