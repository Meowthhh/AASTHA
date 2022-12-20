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

router.post('/:id', function (req, res) {
    console.log(req.body);
    
    const id = req.params.id
    console.log(id)
    const pname = req.body.fname
    const cname = req.body.cname
    const c_number =req.body.c_number
    const complications=req.body.complications
    const date =req.body.date
    const organization =req.body.organization 
    const address =req.body.address
    db.query('UPDATE my_donation SET pname=? , cname=? , c_number=? ,complications=? , date= ? , organization=? , address=?   WHERE id=?',
            [pname, cname, c_number,complications,date,organization, address, id], 
        (err, results) => {
            if (err) {
                console.log(err);
            }
            else {

                
                res.redirect('/dashboard')
            }
        })

})




module.exports = router;