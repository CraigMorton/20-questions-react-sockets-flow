var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.use(express.static('client/build'))

let correctAnswer = ''

io.on('connection', function(socket){
  socket.on('question', (question) => {
    io.sockets.emit('question', question)
  })
  socket.on('response', (response) => {
    io.sockets.emit('response', response)
  })
  socket.on('choose-answer', (answer) => {
    correctAnswer = answer
    io.sockets.emit('answer-chosen')
    console.log(correctAnswer)
  })
})

http.listen(3000, function(){
  console.log('listening on 3000')
})
