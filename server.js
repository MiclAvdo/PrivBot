let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let bodyParser = require('body-parser');

require('dotenv').config();
require('./config/db')

let app = express();

app.use(logger('dev'));
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
// app.use(require('.config/auth'));
// app.use('/api/users', require('./routes/api/users'));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

let port = process.env.PORT || 3001;

app.listen(port, function() {
    console.log(`Express logged into port ${port}`)
});
