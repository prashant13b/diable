var path = require('path'),
    express = require('express'),
    {Message} = require("../models/message.js"),
    {User} = require("../models/user.js")
    

exports.index = (req,res)=>{
    User.findOne({
        sid: req.sessionID
    }).exec().then((usr) => {
        if (usr) {
            Message.find().then((messages) => {
                res.sendFile(path.resolve(`${__dirname}/views/chat.html`));
            })

        } else {
            res.sendFile(path.resolve(`${__dirname}/views/main.html`));
        }
    }).catch((e)=>{
        console.log(e);
res.redirect('/');
})

    }

exports.setname = (req,res)=>{
    user = req.body.name;
    User.findOne({
        sid: req.sessionID
    }).then((usr) => {
        if (!usr) {

            User.findOne({
                name: user
            }).then((foundusr) => {
                if (!foundusr) {
                    var obj = new User({
                        sid: req.sessionID,
                        name: user                
                    });
                    obj.save().then((saved) => {
                        console.log(saved);
                        res.redirect("/");
                    });
                }
            else {      
                        res.redirect('/');
                    }
            });

        }
    });
    }

exports.newMessage = ((req,res)=>{
    var time = req.body.time;
    var timeMin = `${time.Min}`
    if(time.Min<10){
        timeMin = `0${timeMin}`
    }
    var msg = req.body.txtmsg;
    User.findOne({
        sid: req.sessionID
    }).then((usr) => {
        var message = new Message({
            name: usr.name,
            text: msg,
            time: `${time.Hour}:${timeMin}`
        });
        message.save().then((message) => {
            Message.count().then((c) => {
                if (c >= 100) {
                    Message.findOneAndRemove().then(() => {

                    }).catch((e) => {
                        console.log('ERROR : ', e);

                    });
                }
            }).catch((e) => {
                console.log('ERROR : ', e);
            });
            res.send('done');
        });
    });


});

exports.getMessage = ((req,res)=>{
    Message.find().then((messages) => {
                res.json(messages);
            }).catch((e) => {
                res.send(e);
            });
});
    
exports.getName = ((req,res)=>{
    User.findOne({
        sid: req.sessionID
    }).then((usr)=>{
        if(usr){
            res.json({name:usr.name});
        }
    }).catch((err)=>{
        res.send(err)
    })
});
    module.exports = exports;   