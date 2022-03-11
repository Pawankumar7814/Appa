var express = require('express');
var router = express.Router();
var mongooe = require('mongoose');
var Sender = require('../../module/contactUsUser');
var bodyParser = require('body-parser');
var connectDBDev = require('../../config/connection');



class EmailData {

    async SaveContactUserEmail(data, cb) {
        let sender = {};
        sender.FName = data.UNAME;
        sender.Email = data.Uemail;
        sender.Phone = data.Uphone;
        sender.Msg = data.Umsg;
        let senderModel = new Sender(sender);
        await senderModel.save((err, data) => {
            if (err) {
                return cb({ Status: "err", Msg: "Error while Saving Data" });
            } else {
                return cb({ Status: "suc", Msg: "Vender Detail Saved" });
            }
        });
    }

    //Check Admin in Database
    async GetAllMsg(cb) {
        Sender.find({}, (err, sender) => {
            if (err) {
                return cb({ Status: "err", Msg: "Error checking  Data", data: err });
            } else if (sender == null) {
                return cb({ Status: "err", Msg: "No data is there", data: err });
            } else {
                return cb({ Status: "suc", Msg: "User found", data: sender });
            }
        });
    }

    //Check Admin in Database
    async GetOneMsg(UserInfo, cb) {
        Sender.findOne({ _id: UserInfo }, (err, sender) => {

            if (err) {
                return cb({ Status: "err", Msg: "Error checking  Data", data: err });
            } else if (sender == null) {
                return cb({ Status: "err", Msg: "No data is there", data: err });
            } else {
                return cb({ Status: "suc", Msg: "sender found", data: sender });
            }
        });
    }

    //change Msg Status
    async changeStatus(UserInfo, cb) {

        Sender.findOne({ _id: UserInfo }, (err, user) => {

            if (err) {
                return cb({ Status: "err", Msg: "Error checking  Data", data: err });
            } else if (user == null) {
                return cb({ Status: "err", Msg: "User Does not Exist", data: err });
            } else {

                if (user.resolved === true) {
                    Sender.findOneAndUpdate({ _id: UserInfo }, { $set: { resolved: "false" } }, (err, myd) => { console.log(err) });
                } else {
                    Sender.findOneAndUpdate({ _id: UserInfo }, { $set: { resolved: true } }, (err, myd) => { console.log(err) });
                }
                return cb({ Status: "suc", Msg: "User Update", data: user });
            }
        });
    }

    async SaveReply(UserInfo, cb) {
        console.log(UserInfo);
        Sender.findOneAndUpdate({ _id: UserInfo.Id }, { $push: { feedback: { Msg: UserInfo.msg } } }, (err, myd) => {
            if (err) {
                return cb({ Status: "err", Msg: "Error checking  Data", data: err });
            } else if (myd == null) {
                return cb({ Status: "err", Msg: "User Does not Exist", data: err });
            } else {
                return cb({ Status: "suc", Msg: "User Update", data: myd });
            }
        });
    }

}

module.exports = EmailData;