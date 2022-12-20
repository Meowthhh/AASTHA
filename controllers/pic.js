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
const path = require("path");
const multer = require("multer");


router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
// router.use(fileUpload());
// router.use(multer);



const storage = multer.diskStorage({
    destination: (req,file ,cb)=>{
        cb(null,"/Project-_-/RDMS/profile");
    },
    filename: (req,file,cb)=>{
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter: (req, file, cb) => {
        checkFileType(req, file, cb);
    }
})

function checkFileType(req, file, cb) {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/gif'
    ) { // check file type to be png, jpeg, or jpg
        cb(null, true);
    }
    else cb(new Error("File format should be PNG,JPG,JPEG"), false);
}


router.get('/', async(req, res)=> {
        console.log(req.cookies['id']);
        // console.log(req.cookies['email']);
        res.render('pic.ejs');
});


router.post('/',upload.single('upload_image'),async(req,res)=>{
        if(req.file)
            {console.log(req.file);
            res.send('uploaded');
            console.log(req.file);}
        else
            res.send(Error);
})

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