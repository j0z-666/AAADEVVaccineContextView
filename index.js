const express = require('express');
const http = require('http');

var app = express();
server = http.createServer(app);

app.use(express.static('public'));

app.get('/citizenInfo', function(req, res) {
    //res.sendFile(path.join(__dirname + '/index.html'));
    console.log("app get /citizenInfo")
    res.sendFile(__dirname+'/public/joz.json');
});


var puertoApp = process.env.PORT || 8080;
server.listen(puertoApp, () => {

  console.log('Corriendo Server puerto ' + puertoApp);

});

module.exports = app;