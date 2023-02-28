// Node server which will handles socket  io connections
const io = require('socket.io')(8000)

const users = {};

io.on('connection', socket => {
    // if new users join, let other users connected to server know!
    socket.on('new-user-joined', name => {
        console.log(name)
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name)
    });
    // if someone send message, broadcast it to other pepople
    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] })
    })

    // if someone leave chat, let others to know
    
    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id]
    })
});