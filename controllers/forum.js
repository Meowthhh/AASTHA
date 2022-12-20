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
const bcrypt = require("bcryptjs");
// const fileUpload = require('express-fileupload');


router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
// router.use(fileUpload());


router.get('/', function (req, res) {

    db.query('SELECT * from add_blood_requst', function (err, result) {
        console.log(result);
        res.render('forum', {data: result });
    })
});

router.get('/:id', function (req, res) {
        console.log(req.params.id)

        res.render('forum-1',{id:req.params.id} ) ;
    // db.query('SELECT * from add_blood_requst', function (err, result) {
    //     console.log(result);
    //     res.render('forum', {data: result });
    // })
});




module.exports = router;