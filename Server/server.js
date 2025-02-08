const express = require("express");
const app = express();
const path = require('path');
var fs = require('fs');

const http = require('http').Server(app);


const engine = require('ejs-locals');
const { log } = require("console");
const io = require('socket.io')(http);
let Stop_MSG = false;


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

// baned list
let ban_list = ["0"];


// setup socket.io
var userId = 0;

io.on('connection', function (socket) {
    socket.userId = userId++;
    const ipAddress = socket.handshake.address;

    for(let i=0; i<ban_list.length; i++){
        if(ipAddress == ban_list[i]){
            io.sockets.connected[socket.id].disconnect();
            console.log("disconnect");
            
        }
    }


    //console.log(ipAddress);
    
    io.emit('Get_IP', ipAddress);

    socket.on('Stop_MSG',(msg) => {
        Stop_MSG = msg;
        console.log(Stop_MSG);
        io.emit("Stop_MSG", Stop_MSG);
    });


    socket.on('Send_MSG', function (msg) {

        if(!Stop_MSG){
            //console.log('message from user#' + socket.userId + ": " + msg);
            io.emit('Get_MSG', msg);
        }
    });


    socket.on('Get_Ban_List', function (msg) {
        ban_list = msg;
        console.log(ban_list);
        
    });

});


let PORT = process.env.PORT || 8080;
http.listen(PORT, () => console.log(`Server running on port ${PORT}`));
