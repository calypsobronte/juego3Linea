const express = require('express');
const server = express();
const bodyParser = require('body-parser');
server.use(bodyParser.json()); // for parsing application/json
server.use(bodyParser.urlencoded({ extended: true }));
server.get('/', express.static('public'));
server.listen(3000);