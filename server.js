const express = require('express')
const app = express();
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const server = require('http').Server(app);
const io = require('socket.io')(server);

require('dotenv').config();
const apiai = require('apiai')(process.env.APIAI_TOKEN);

// CONSTANTS
const PORT = process.env.PORT || 3001;

require('./config/db')

app.use(logger('dev'));
// app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
// app.use(require('.config/auth'));
app.use('/api/users', require('./routes/api/users'));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

io.on('connection', function(socket) {
    console.log('socket request')
    socket.on('chat message', (text) => {
        console.log('text:', text);
        console.log('Message: ' + text);
  
      let apiaiReq = apiai.textRequest(text, {
        sessionId: process.env.APIAI_SESSION_ID
      });
  
      apiaiReq.on('response', (response) => {
        let aiText = response.result.fulfillment.speech;
        console.log('Bot reply: ' + aiText);
        socket.emit('bot reply', aiText);
      });
  
      apiaiReq.on('error', (error) => {
        console.log(error);
      });
  
      apiaiReq.end();
  
    });
});

server.listen(PORT, function() {
    console.log(`Express logged into port ${PORT}`)
});
