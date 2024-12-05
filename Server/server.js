const express = require("express");
const app = express();
const path = require('path');
var fs = require('fs');

const http = require('http').Server(app);


const engine = require('ejs-locals');
const io = require('socket.io')(http);


app.use(express.static(path.join(__dirname, '/public/')));
app.use(express.static('node_modules'));
app.use(express.static('node_modules/bootstrap/dist/css'));
app.use(express.static('node_modules/bootstrap/dist/js'));
app.use(express.static('src'));

app.set('views', './src/views');
app.set('view engine', 'ejs');


// setup express router
app.get('/', function (req, res) {
    res.render('test', {title: "900Hz Console"});
}); 


io.on('connection', function (socket) {
    console.log('a user connected, user id: ');
});


// setup socket.io
var userId = 0;
io.on('connection', function (socket) {
    socket.userId = userId++;
    console.log('a user connected, user id: ' + socket.userId);

    socket.on('chat', function (msg) {
        console.log('message from user#' + socket.userId + ": " + msg);
        io.emit('chat', msg);
        io.emit('get', "get message: " + msg.toString());
    });
});

let PORT = 443;
// http.listen(PORT, () => console.log(`Server running on port ${PORT}`));

http.listen(process.env.PORT || PORT, function() {
    var host = http.address().address
    var port = http.address().port
    console.log('App listening at ', host, port)
});