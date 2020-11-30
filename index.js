const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index.ejs');
});

let messages = [];

io.on('connection', socket => {
    socket.on('message', (values) => {
        messages.push(values);

        socket.broadcast.emit('typedmessages', values);
    });

    console.log(socket.id);

    socket.emit('previusMessages', messages)
})

server.listen(3000);