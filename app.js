var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

var port = process.env.PORT || 5000;

var htmlparser = function (url) {
        request(url, function (err, res, html) {
            if (!err) {
                var $ = cheerio.load(html);
                $('').filter(function () {
                    var data = $(this);
                    var theThingIWant = data.childern();
                });
            }
        });
    }
    //Environment variables
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('./start.ejs');
});

app.post('/parse', function (req, res) {
    res.send(htmlparser(req.body.url));
});

app.listen(port, function () {
    console.log('Listening on port: ' + port);
});