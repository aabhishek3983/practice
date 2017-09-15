const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();
hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', function() {
    return new Date().getFullYear();
})
app.set('view engine', 'hbs');

app.use(function(req, res, next) {
    var currTime = new Date().toDateString();
    console.log(currTime);
    console.log(req.method);
    console.log(req.url);
    fs.appendFile('foo.bar', req.method, function(err) {
        if (err) {
            error('there was an error');
        }

    })
    next();
})
// tell to use middleware
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    //res.send('<h1>Abhishek</h1>');
    res.send({name: 'Abhishek'})
});

app.get('/about', function(req, res) {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.listen(port);