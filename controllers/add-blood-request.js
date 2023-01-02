var express = require('express');
// var home = require('./home');

router.post('/',function(req,res)
{
    console.log(req.body);
    const user_email  = req.cookies['email'];


module.exports = router;
