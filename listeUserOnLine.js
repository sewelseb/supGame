module.exports = function(io) {

    io.sockets.on('connection', function (socket) {
    	console.log('test du socket io');
        socket.on('captain', function(data) {
            console.log(data);
            socket.emit('Hello');
        });
    });
};