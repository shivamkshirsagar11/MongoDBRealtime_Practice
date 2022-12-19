const {Server} = require('socket.io');
const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.get("/", function(req, res){
res.write('Welcome')
});
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin',['*']);
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Methods','Content-Type');
    next(); 
});

const httpServer = http.createServer(app);

const io = new Server(httpServer,{
    cors:{
        origin:"http://localhost:3000",
        methods:['GET','POST']
    }
});
io.on('connection', (socket) => {
    console.log(`a user is connected id: ${socket.id}`);
socket.emit("hello","World");
socket.on("howdy",(args)=>{
    console.log(args);
    // socket.broadcast.emit("client","Message recieved");
    socket.emit("client","Message recieved");
})
});
httpServer.listen(8080,()=>{
    console.log("Server is on!");
});