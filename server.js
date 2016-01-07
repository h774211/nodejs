var http = require('http');
var express = require('express');
var bodyParser = require('body-parser')
var Crate = require('cratejs');
var db = module.exports = new Crate({
  host: '192.168.99.100’,
  port: 4200,
  /* Optional manual clustering
  cluster: [
      {
          host: '192.168.99.100',
          port: 32775,
          host: '192.168.99.100',
          port: 32777,
          host: '192.168.99.100',
          port: 32779,
      }
  ]
  */
});
var app = express();
var server = http.createServer(app);
app.use(bodyParser.json())
app.get('/test', function(req, res) {
    console.log(req.body.toString());      // your JSON
    res.send(req.body);    // echo the result back
});
app.post('/error_report', function(req, res) {
    var insertBars = db.Insert('error_report');

    var pi = req.body.phoneInfo;
    //Inserting a single row
    insertBars.data({
        appver: req.body.appversion,
        title: req.body.eTital,
        stacktrace: req.body.eStackTrace,
        phoneinfo: pi,
        ts: Date.now()
    }).run(function(err, res) {
        console.log(err);
    });
    console.log(req.body);      // your JSON
    res.send("ok");    // echo the result back
});

app.post('/ios_report', function(req, res) {
    var insertBars = db.Insert('ios_error_report');

    var pi = req.body.phoneInfo;
    //Inserting a single row
    insertBars.data({
        appver: req.body.appversion,
        title: req.body.eTital,
        stacktrace: req.body.eStackTrace,
        phoneinfo: pi,
        ts: Date.now()
    }).run(function(err, res) {
        console.log(err);
    });
    console.log(req.body);      // your JSON
    res.send("ok");    // echo the result back
});


app.get('/moloapp', function(req, res) {
	var file = __dirname + '/3.26.apk';
 	res.download(file); // Set disposition and send it.
});

app.get('/moloapp_test', function(req, res) {
        var file = __dirname + '/moloapp_freecall_313.apk';
        res.download(file); // Set disposition and send it.
});

app.get('/moloapp_lan', function(req, res) {
        var file = __dirname + '/languages/' + req.query.lan;
        res.download(file); // Set disposition and send it.
});

server.listen(3000,’0.0.0.0’,function(){
    console.log('HTTP伺服器在 http://'+process.env.IP+':'+process.env.PORT+'/ 上運行');
});
