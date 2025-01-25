const express = require("express");
const app = express();
const path = require('path');
var fs = require('fs');

const http = require('http').Server(app);


const engine = require('ejs-locals');
const io = require('socket.io')(http);


app.use(express.static(path.join(__dirname, '/public/')));
app.use(express.static(path.join(__dirname,'/node_modules')));
app.use(express.static(path.join(__dirname,'/node_modules/bootstrap/dist/css')));
app.use(express.static(path.join(__dirname,'/node_modules/bootstrap/dist/js')));
app.use(express.static(path.join(__dirname,'/src')));
app.use(express.static(path.join(__dirname,'/src/JS')));


app.set('views', './src/views');
app.set('view engine', 'ejs');


// setup express router
app.get('/', function (req, res) {
    res.render('main', {title: "900Hz Console"});
}); 


app.get('/test', function (req, res) {
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

    socket.on('Send_MSG', function (msg) {
        console.log('message from user#' + socket.userId + ": " + msg);
        io.emit('Get_MSG', msg);
    });
});


let PORT = process.env.PORT || 8080;
http.listen(PORT, () => console.log(`Server running on port ${PORT}`));
