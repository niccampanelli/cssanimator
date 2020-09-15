const express = require('express');
const routes = require('./routes');
const bodyParser = require ('body-parser');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(routes);
app.listen(3333);