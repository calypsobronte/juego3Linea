const express = require('express');
const ejs = require('ejs');

const server = express();

const bodyParser = require('body-parser');
server.use(bodyParser.json()); // for parsing application/json
server.use(bodyParser.urlencoded({ extended: true }));

//Public css, js
server.use(express.static('public'));

//configuracion de los componentes
server.set('view engine', 'ejs');
server.set('views', './views');
server.set('port', (process.env.PORT || 3000));//localhost:3000

//Visualizacion de juego
server.get('/', function (req, res) {
    res.render('game')
});

//Correr el programa
server.listen(server.get('port'), function () {
    console.log('Vamos a jugar', server.get('port'));
});