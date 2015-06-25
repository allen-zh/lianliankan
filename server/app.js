var app = require('http').createServer();
var io = require('socket.io').listen(app, {
  'log level': process.env.NODE_ENV === 'production' ? 1 : 3,
  //, 'transports': ['websocket','flashsocket','htmlfile','xhr-polling','jsonp-polling']
  'transports': ['websocket', 'xhr-polling', 'jsonp-polling'],
  'close timeout': 60,
  'heartbeat timeout': 20, // defaults to 60 seconds
  'heartbeat interval': 10, //  defaults to 25 seconds'
  'polling duration': 15 // defaults to 20 seconds'
});

app.listen(8093);

var room = require('./room');

io.sockets.on('connection', function(socket) {

  var uid = socket.handshake.query.c;

  room.connect(socket, uid || null);

});

console.log('server started');
