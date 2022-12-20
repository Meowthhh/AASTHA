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

    db.query('SELECT DISTINCT division from address ORDER BY division ASC', function (err, result) {
        res.render('dummy.ejs', { division: result });
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

// router.post('/', function (req, res) {

//     let temp_dob = new Date(req.body.d_o_b);
//     var n = temp_dob.getFullYear();
//     console.log(n);
//     var today = new Date()

//     console.log(today.getFullYear());

//     if (!req.files)
//         {return res.status(400).send('No files were uploaded.');}

//     var file = req.files.uploaded_image;
//     var img_name = file.name;
//     if (!req.files)
//        { return res.status(400).send('No files were uploaded.');}

//     var file = req.files.uploaded_image;
//     var img_name = file.name;

//     if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif") {

//         file.mv('public/images/upload_images/' + file.name, function (err) {

//             if (err)

//                 return res.status(500).send(err);
//             var sql = "INSERT INTO `users_image`(`first_name`,`last_name`,`mob_no`,`user_name`, `password` ,`image`) VALUES ('" + fname + "','" + lname + "','" + mob + "','" + name + "','" + pass + "','" + img_name + "')";

//             var query = db.query(sql, function (err, result) {
//                 res.redirect('profile/' + result.insertId);
//             });
//         });
//     } else {
//         message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
//         res.render('index.ejs', { message: message });
//     }else {
//     res.render('index');
// }

// router.post('/', function (req, res) {
//     console.log(req.files);
//     console.log(req.body);
//     if (!req.files)
//         return res.status(400).send('No files were uploaded.');

//     var file = req.files.uploaded_image;
//     var img_name = file.name;
//     var email= req.body.email;

//     if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif") {

//         file.mv('public/images/upload_images/' + file.name, function (err) {
//             if (err)
//                 return res.status(500).send(err);

//             else {
//                 db.query("INSERT INTO `users_image` where image_name=? AND email=?"[img_name,email],function(err,result){

//                     res.redirect('/myprofile');
//                 });
//             }
//         });
//     } else {
//         message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
//         res.render('dummy.ejs', { message: message });
//     }
// });



module.exports = router;