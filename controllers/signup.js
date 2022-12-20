var express = require('express');
// var home = require('./home');
var mysql = require('mysql');
var news = require('express-session');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('../config/dbconfig');
var sweetalert = require('sweetalert2');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs")


router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());




router.get('/', function (req, res) {
    res.clearCookie('email');
    db.query('SELECT DISTINCT division from address ORDER BY division ASC', function (err, result) {
        res.render('register.ejs', { division: result });
    })
});

router.get('/get_data', function (request, response, next) {

    var type = request.query.type;

    var search_query = request.query.parent_value;
    console.log(search_query, type);

    if (type == 'load_district') {
        // var query = `
        // SELECT DISTINCT district AS Data FROM address
        // WHERE country = '${search_query}' 
        // ORDER BY district ASC
        // `;
        db.query('SELECT DISTINCT district as Data from `address` Where division = ?  ORDER BY district ASC', [search_query], function (error, data) {

            console.log(data);

            var data_arr = [];

            data.forEach(function (row) {
                data_arr.push(row.Data);
            });

            response.json(data_arr);

        });
    }

    if (type == 'load_city') {
        // var query = `
        // SELECT city AS Data FROM address 
        // WHERE district = '${search_query}' 
        // ORDER BY city ASC
        // `;
        db.query('SELECT DISTINCT city as Data from `address` Where district = ?  ORDER BY city ASC', [search_query], function (error, data) {

            console.log(data);

            var data_arr = [];

            data.forEach(function (row) {
                data_arr.push(row.Data);
            });

            response.json(data_arr);

        });
    }

    // db.query(query, function (error, data) {

    //     console.log("vallagena: ", data);

    //     var data_arr = [];

    //     data.forEach(function (row) {
    //         data_arr.push(row.Data);
    //     });

    //     response.json(data_arr);

    // });

});



router.post('/', function (req, res) {

    // get data from registraion form
    console.log(req.body)
    const { fname, lname, email, password, passwordConfirm } = req.body;
    db.query('SELECT email from user WHERE email = ?', [email], async (err, results) => {
        if (err) {
            console.log(err);
        } else {
            if (results.length > 0) {
                return res.render('register', {
                    message: 'The email is already in use'

                })
            } else if (password != passwordConfirm) {
                return res.render('register', {
                    message: 'Password dont match'
                });
            }
        }

        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        db.query('INSERT INTO user SET ?', {
            fname: fname, lname: lname, email: email, password: hashedPassword
        }, (err, results) => {
            if (err) {
                console.log(err);
            } else {
                db.query('SELECT id from user WHERE email = ?', [email], (err, results) => {
                    console.log(results);
                    id = results[0].id;

                    res.redirect('/update-profile');
                })
            }
        })
    })
    // res.send("Form submitted");
});



module.exports = router;