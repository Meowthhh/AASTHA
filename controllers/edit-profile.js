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

router.get('*', function (req, res, next) {
    if (req.cookies['email'] == null) {
        res.redirect('/login');
    } else {
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

    if (type == 'load_district') {
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

    if (type == 'load_city') {
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
    

    // console.log(req.body);
    // console.log(req.file);

})
module.exports = router;
