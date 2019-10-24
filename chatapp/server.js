var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var http = require('http');
var io = require('socket.io')(http);

var app = express();
var dbUrl = `mongodb+srv://urwa:urwa123@cluster0-2sp7l.mongodb.net/test?retryWrites=true`;

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

mongoose.connect(dbUrl, (err) => {
    console.log('mongodb connected', err);
})

var Message = mongoose.model('Message', {name: String, message: String} );

var server = app.listen(3000, () => {
    console.log(`server is running on port ${server.address().port}`)
})

app.get('/messages', (req, res) => {
    Message.find({}, (err, messages) => {
        res.send(messages);
    })
})

app.post('/messages', (req,res) => {
    var message = new Message (req.body);
    message.save((err) => {
        if(err) sendStatus(500);
        io.emit('message', req.body);
        res.sendStatus(200);
    })
})

io.on('connection', () => {
    console.log('A user is connected');
})

