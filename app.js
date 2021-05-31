const express = require('express');
const app = express(); 
//npm install socket.io
const socket = require('socket.io'); 
//npm install http 
const http = require('http');//소켓과 연결하기 위해서. http문서를 읽어오기 위해
const server = http.createServer(app);
const io = socket(server);  
const nunjuncks = require('nunjucks'); 

app.use(express.static('./node_modules/socket.io/client-dist'))

app.set('view engine', 'html'); 
nunjuncks.configure('views',{ 
    express:app, 
})



app.get('/',(req,res)=>{
    res.render('index.html'); 
}); 

io.sockets.on('connection',(socket)=>{
    socket.on('send',(data)=>{
        console.log(`클라이언트에서 받은 메세지는 ${data.msg}`)
        socket.broadcast.emit('call',data); 
    })
})

server.listen(3000,()=>{ 
    console.log('hello port 3000')
})