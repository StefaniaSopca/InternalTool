const express = require('express');

const bodyParser = require('body-parser');

const schedulerRoutes = require('./routes/scheduler');

const errorController = require('./controllers/error');


const app = express();
var cors = require('cors'); 
app.use(cors());

const ports = process.env.PORT || 3000;

const http = require('http').createServer(app);

// const io = require('socket.io')(http,
//     {handlePreflightRequest: (req, res) => {
//         const headers = {
//             "Access-Control-Allow-Headers": "Content-Type, Authorization",
//             "Access-Control-Allow-Origin": 'http://localhost:3000', //or the specific origin you want to give access to,
//             "Access-Control-Allow-Methods":"GET, POST, PUT, DELETE, PATCH, OPTIONS",
//             "Access-Control-Allow-Credentials": true
//         };
//         res.writeHead(200, headers);
//         res.end();
//     }});

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key, Authorization');
   
	next();
	
});



app.use('/scheduler', schedulerRoutes);

app.use(errorController.get404);

app.use(errorController.get500);


// io.on('connection', (socket) => {
   
//     console.log('a user connected');
//     socket.on('message', (msg) => {
//         console.log(msg);
//         socket.broadcast.emit('message-broadcast', msg);
//     });
//     socket.on('disconnect', () => {
//         console.log('a user disconnected!');
//       });
// });


http.listen(ports, ()=>console.log(`Listening on port ${ports}`));

