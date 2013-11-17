'use strict';
var  http = require('http'),
     https = require('https'),
      fs = require('fs');




//Post the Json Data
exports.postStaticJsonData = function (req, res) {
    //Contains the location of the file
    var notes = req.body;
    var postData = JSON.stringify(notes);
    var fileLocation = __dirname + '/../public/js/notes.json';
    //Read the file asynchronously
    fs.writeFile(fileLocation,postData ,'utf8', function (err, data) {
        if (err) {
            throw err;
        } else {
            res.json({
            });
        }
    });
};


//Post the Json Data
exports.getStaticJsonData = function (req, res) {
    //Contains the location of the file
    var fileLocation = __dirname + '/../public/js/notes.json';
    //Read the file asynchronously
    fs.readFile(fileLocation,'utf8', function (err, data) {
        if (err) {
            throw err;
        } else {
            res.json({
               data: JSON.parse(data)
            });
        }
    });
};