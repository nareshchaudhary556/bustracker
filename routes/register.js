var express = require('express');
var router = express.Router();
var nodemailer = require("nodemailer");
var api = require('../models/register.js');
var emergencyapi = require('../models/emergencycontacts.js');
var busListapi = require('../models/buslists.js');
var busLocationapi = require('../models/buslocation.js');
var busStopapi = require('../models/busstop.js');


/* SAVE  */
router.post('/', function (req, res, next) {
    api.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

router.get('/:Id', function (req, res, next) {
    api.find({ Phone_No: req.params.Id }, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});


router.post('/updatepassword/:Id', function (req, res, next) {
    api.findOneAndUpdate({ Phone_No: req.params.Id },
        { $set: { password: req.body.password } },
        { new: true }, function (err, post) {
            if (err) return next(err);
            res.json(post);
        });

});


router.post('/deleteAccount/:Id', function (req, res, next) {
    api.findOneAndRemove({ Phone_No: req.params.Id }, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

router.post('/userLogin', function (req, res) {
    api.findOne({ "$and": [{ "Phone_No": req.body.Phone_No }, { "password": req.body.password }] },
        function (err, user) {
            console.log(user);
            if (err) throw err;
            if (!user) {
                res.json({ success: false, msg: 'Authentication failed. User not found .' });
            } else {
                res.json({ success: true });
            }
        });
});


router.get('/buslist', function (req, res, next) {
    busListapi.find(function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

router.get('/busstop', function (req, res, next) {
    busStopapi.find(function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});


router.get('/buslocation', function (req, res, next) {
    busLocationapi.find(function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});


/* SAVE  */
router.post('/emergency', function (req, res, next) {
    emergencyapi.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

router.get('/emergency/:Id', function (req, res, next) {
    emergencyapi.find({ Phone_No: req.params.Id }, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});


router.post('/updateemergency/:Id', function (req, res, next) {
    emergencyapi.findOneAndUpdate({ Phone_No: req.params.Id },
        { $set: { emergency_no: req.body.emergency_no } },
        { new: true }, function (err, post) {
            if (err) return next(err);
            res.json(post);
        });

});



/* Email */
router.post('/send-email', function (req, res) {

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'trackerbusapp@gmail.com',
            pass: 'pass_@123'
        }
    });
    let text_html = "<p><b> Hi " + req.body.name + ", </b></p><p><b>welcome to bus tracker app, you can track bus and see live location</b> </p><p><b>Regards,</b> <br/><b>   BusTracker-Team</b> </p> ";

    let mailOptions = {
        from: 'trackerbusapp@gmail.com',
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.text,
        html: text_html
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        res.json(info);
    });
});


/* Email */
router.post('/sendotp', function (req, res) {

    console.log(req.body);
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'trackerbusapp@gmail.com',
            pass: 'pass_@123'
        }
    });
    let text_html = "<p><b> Hi " + req.body.name + ", </b></p><p><b>Your OPT is " + req.body.OTP + ", valid only for two minutes</b> </p><p><b>Regards,</b> <br/><b>   BusTracker-Team</b> </p> ";

    let mailOptions = {
        from: 'trackerbusapp@gmail.com',
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.text,
        html: text_html
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        res.json(info);
    });
});


/* Email */
router.post('/sendPassword', function (req, res) {

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'trackerbusapp@gmail.com',
            pass: 'pass_@123'
        }
    });
    let text_html = "<p><b> Hi " + req.body.name + ", </b></p><p><b>your password is " + req.body.password + "</b> </p><p><b>Regards,</b> <br/><b>   BusTracker-Team</b> </p> ";

    let mailOptions = {
        from: 'trackerbusapp@gmail.com',
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.text,
        html: text_html
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        res.json(info);
    });
});



/* Email */
router.post('/sendChangePassword', function (req, res) {

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'trackerbusapp@gmail.com',
            pass: 'pass_@123'
        }
    });
    let text_html = "<p><b> Hi " + req.body.name + ", </b></p><p><b> your password is changed successfully</b> </p><p><b>Regards,</b> <br/><b>   BusTracker-Team</b> </p> ";

    let mailOptions = {
        from: 'trackerbusapp@gmail.com',
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.text,
        html: text_html
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        res.json(info);
    });
});


module.exports = router;
