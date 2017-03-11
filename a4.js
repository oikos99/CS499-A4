/**
 * Created by Paul on 3/10/2017.
 */
var elasticsearch = require('elasticsearch');
var express = require('express');
var request = require('request');
var parser = require('json-parser');

var client = new elasticsearch.Client({
    host: 'https://search-cs499-a4-adxr6e5ugxnnovarprdnbyhcjy.us-west-2.es.amazonaws.com/',
    log: 'info'
});

client.ping({
    // ping usually has a 3000ms timeout
    requestTimeout: 5000
}, function (error) {
    if (error) {
        console.trace('elasticsearch cluster is down!');
    } else {
        console.log('All is well');
    }
});


function loadDataSet() {
    var requestLoop = setInterval(function(){
        request('http://api.coindesk.com/v1/bpi/currentprice.json', function (error, response, body) {
            if (!error && response.statusCode == 200) {

                var object = parser.parse(body);

                console.log(object.time.updated);
                console.log("1 BTC = " + object.bpi.USD.rate_float + " USD");
                console.log("1 BTC = " + object.bpi.EUR.rate_float + " EUR");
                console.log("1 BTC = " + object.bpi.GBP.rate_float + " GBP");

                client.index({
                    index: 'bitcoin-price',
                    type: 'bitcoin',
                    id: object.time.updated,
                    body: object
                }, function (error, response) {
                    console.log(response)
                    console.log("")
                })
            }
        })
    }, 60 * 1000);
}


var app = express()

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/load', function (req, res) {
    loadDataSet();
})


app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})