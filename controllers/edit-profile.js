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
const path = require("path");
const multer = require("multer");
const { debugPort } = require('process');
const fs = require('fs');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('*', function (req, res, next) {
    if (req.cookies['email'] == null) 
    {
        res.redirect('/login');
    } 
    else 
    {
        next();
    }
});

router.get('/', function (req, res) {
    const email = req.cookies['email'];
    db.query('SELECT * from user_info where email=?', [email], function (err, results) {
        db.query('SELECT DISTINCT division from address ORDER BY division ASC', function (err, result) {
            res.render('edit-profile', { division: result, user: results });
        });
    })
});

router.get('/get_data', function (request, response, next) {

    var type = request.query.type;
    var search_query = request.query.parent_value;
    
    // console.log(search_query, type);

    if (type == 'load_district') 
    {
        // var query = `
        // SELECT DISTINCT district AS Data FROM address
        // WHERE country = '${search_query}' 
        // ORDER BY district ASC
        // `;
        db.query('SELECT DISTINCT district as Data from `address` Where division = ?  ORDER BY district ASC', [search_query], function (error, data) {

            // console.log(data);

            var data_arr = [];

            data.forEach(function (row) {
                data_arr.push(row.Data);
            });

            response.json(data_arr);

        });
    }

    if (type == 'load_city') 
    {
        // var query = `
        // SELECT city AS Data FROM address 
        // WHERE district = '${search_query}' 
        // ORDER BY city ASC
        // `;
        db.query('SELECT DISTINCT city as Data from `address` Where district = ?  ORDER BY city ASC', [search_query], function (error, data) {

            // console.log(data);

            var data_arr = [];

            data.forEach(function (row) {
                data_arr.push(row.Data);
            });

            response.json(data_arr);

        });
    }
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "/Project-1/project/public/img/uploaded_imgs");
    },
    filename: (req, file, cb) => {
        var id = Date.now() + path.extname(file.originalname)
        cb(null, id);
    }
})
const upload = multer({ storage: storage })

router.post('/', upload.single('upload_image'), function (req, res) {

    const fname = req.body.fname;
    const lname = req.body.lname;
    const c_number = req.body.c_number;
    const address = req.body.address;
    const street = req.body.street;
    const zip = req.body.zip;
    const division = req.body.division;
    const district = req.body.district;
    const city = req.body.city;
    const email = req.cookies['email'];

    console.log(req.file)
    
    if (req.file == undefined) 
    {
        db.query('UPDATE user_info SET fname=? , lname=? , c_number=? , address=? , street=?  , zip=? , division=? , district=? , city=?  WHERE email=?',
            [fname, lname, c_number, address, street, zip, division, district, city, email], function (err, result) {
                if (err) {
                    console.log(err);
                }
                else {
                    // console.log(result);
                    // console.log(req.cookies['email']);
                    res.redirect('/dashboard');
                }
            })
    }
    else 
    {
        db.query("select img FROM user_info where email=?", [email], (err, result) => {
            // console.log(result[0].img);
            const name = result[0].img;
            const path = './public/img/uploaded_imgs/' + name;
            const img = req.file.filename;
            console.log(img);

            fs.unlink(path, (err) => {
                if (err) {
                    console.error(err)
                }  //file removed
            })
            db.query('UPDATE user_info SET fname=? , lname=? , c_number=? , address=? , street=?  , zip=? , division=? , district=? , city=? , img=?  WHERE email=?',
                [fname, lname, c_number, address, street, zip, division, district, city, img, email], function (err, results) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        // console.log('chudi');
                        // console.log(req.cookies['email']);
                        res.redirect('/dashboard');
                    }
                })
        })
    }

    // console.log(req.body);
    // console.log(req.file);

})
module.exports = router;
