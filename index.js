const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

let users = 0;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  io.emit('user connection', 'somebody connected');
  users++;
  io.emit('user count', users);

  socket.on('disconnect', () => {
    users--;
    io.emit('user count', users);
    io.emit('user disconnect', 'somebody left :(');
  });

  socket.on('chat message', function(msg){
    socket.broadcast.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
