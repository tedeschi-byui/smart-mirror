const PORT = process.env.PORT || 5000

var ejs = require("ejs");
var express = require("express");
var bodyParser = require('body-parser');
var request = require('request');
var convert = require('xml-js');

var app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set("views", "views");
app.set("view engine", "ejs");


app.listen(PORT, function () {
    console.log("Listening on port " + PORT);
});


app.get("/", function (req, res) {
    res.render("client", { text: "Text goes here" });
    res.end();
});

app.get('/getWeather/:token/:latitude/:longitude', function (req, res) {
    request(`https://api.darksky.net/forecast/${req.params.token}/${req.params.latitude},${req.params.longitude}`, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.json({ success: true, response: JSON.parse(body) });
            res.end();
        } else {
            res.json({ success: false, error: response });
            res.end();
        }
    });
});

app.get('/getNews', function (req, res) {
    request(`https://news.google.com/news?ned=us&output=rss`, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var bodyJson = convert.xml2json(body, { compact: true });
            res.json({ success: true, response: JSON.parse(bodyJson) });
            res.end();
        } else {
            res.json({ success: false, error: response });
            res.end();
        }
    });
});