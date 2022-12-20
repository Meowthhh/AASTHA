const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const app = express();
const path = require("path");
const cookieParser = require('cookie-parser');
// const fileUpload = require('express-fileupload');
const multer = require('multer');

//use css
app.use('/public',express.static('public'));
app.use(express.static('./public'));

app.set('view engine','ejs');

//create server
const port =8080;

app.listen(port,()=>{ console.log(`server is up on port ${port}`)});
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.json());
// app.use(fileUpload());

//controller require
var home = require('./controllers/home');
var login = require('./controllers/login');
var logout = require('./controllers/logout');
var signup = require('./controllers/signup');
var myprofile = require('./controllers/my-profile');
var dashboard = require('./controllers/dashboard');
var new_request = require('./controllers/new-request');
var request_feed = require('./controllers/request-feed');
var search_donor = require('./controllers/search-donor');
var user_profile = require('./controllers/user-profile');
var edit_profile = require('./controllers/edit-profile');
// var dummy = require('./controllers/dummy');
// var pic = require('./controllers/pic');
// var dummy1 = require('./controllers/dummy1');
var update_profile = require('./controllers/update-profile');
var add_blood_request = require('./controllers/add-blood-request');
var edit_profile = require('./controllers/edit-profile');
var add_donation = require('./controllers/add-donation')
var change_password = require('./controllers/change-password')
// var forum = require('./controllers/forum')
var edit_donation = require('./controllers/edit-donation')
var aboutus = require('./controllers/aboutus')
var organization_login = require('./controllers/organization-login')
var organization = require('./controllers/organization')


//route use
app.use('/',home);
app.use('/login',login);
app.use('/logout',logout);
app.use('/signup',signup);
app.use('/dashboard',dashboard);
app.use('/my-profile',myprofile);
app.use('/request-feed',request_feed);
app.use('/new-request',new_request);
app.use('/search-donor',search_donor);
app.use('/user-profile',user_profile);
// app.use('/dummy',dummy);
// app.use('/dummy1',dummy1);
// app.use('/pic',pic);
app.use('/update-profile',update_profile);
app.use('/add-blood-request',add_blood_request);
app.use('/edit-profile',edit_profile);
app.use('/add-donation',add_donation);
app.use('/change-password',change_password);
// app.use('/forum',forum)
app.use('/edit-donation',edit_donation)
app.use('/aboutus',aboutus)
app.use('/organization-login',organization_login)
app.use('/organization',organization)