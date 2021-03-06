const express = require('express');
const axios = require('axios');
var exphbs  = require('express-handlebars');
const http = require('http');

var app = express();
server = http.createServer(app);

app.use(express.static('public'));
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/citizenInfo', function(req, res) {

    if(req.query.id == undefined){
        res.send('Bad Request');
        console.log('El request no tiene id');
        return;
    }
    console.log("app get /citizenInfo, query id = " + req.query.id);

    axios.get('https://breeze2-196.collaboratory.avaya.com/services/AAADEVContextStore/cs/contexts/'+req.query.id)
    .then(function(resp){
        if(resp.data.data != undefined && resp.data.data.valid != undefined){
            let datos = resp.data.data;
            datos.jsonStr = JSON.stringify(datos, undefined, 4);
            res.render('ContextView', datos);
        } else {
            res.render('ContextView', {});
        }
    })
    .catch(function(error){
        console.log('Axios error: ' + error);
        res.render('ContextView', {});
    })
});


var puertoApp = process.env.PORT || 8080;
server.listen(puertoApp, () => {

  console.log('Corriendo Server puerto ' + puertoApp);

});

module.exports = app;