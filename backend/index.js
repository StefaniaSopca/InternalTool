const express = require('express');

const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');

const errorController = require('./controllers/error');

const app = express();

const ports = process.env.PORT || 3000;


const http = require('http').createServer(app);



const io = require('socket.io')(http,{
    cors: {
        orgin: '*'
    }
});
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, SELECT');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/auth', authRoutes);

app.use(errorController.get404);

app.use(errorController.get500);


io.on('connection', (socket) => {
   
    console.log('a user connected');
    socket.on('message', (msg) => {
        console.log(msg);
        socket.broadcast.emit('message-broadcast', msg);
    });
});

http.listen(ports, ()=>console.log(`Listening on port ${ports}`));

