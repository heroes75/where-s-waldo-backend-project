require('dotenv/config')
const express = require('express')
const cors = require('cors')
const {createServer} = require('node:http')
const { Server } = require('socket.io')
const game = require('./routes/gameRouter')
const leadboardRouter = require('./routes/leadboardRouter')
const { randomUUID } = require('node:crypto')


const app = express()
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173/", 'http://127.0.0.1:5173']
    }
})
const lobby = new Set()
const roomId = {id: ''}

function totalCount() {
    return io.of("/").sockets.size;
}

function clientCountInMultiplayer(id) {
    return io.of("/").adapter.rooms.get(id)?.size || 0;
}

io.on('connection', (socket) => {
    console.log('user connected:')

    socket.join('multiplayer')
    console.log('lobby:', lobby.size)
    if (lobby.size  === 0) {
        var id = randomUUID() + ''
        roomId.id = id
        socket.broadcast.emit('lobby', { msg: 'Please Wait...', nextGame: null, id})
        socket.emit('lobby', { msg: 'Please Wait...', nextGame: null, id})
        socket.join(id)
        io.to(id).emit('welcome')
        lobby.add(socket.id)
        console.log('lobby:', lobby.size)
    } else if(lobby.size  === 1) {
        lobby.add(socket.id)
        socket.broadcast.emit('lobby', {msg: 'you\'re connected now to a player', nextGame: '/multiplayer/' + roomId.id + '/cmpeul32y0000yyud7tymzxse', id: roomId.id})
        socket.emit('lobby', {msg: 'you\'re connected now to a player', id: roomId.id, nextGame: '/multiplayer/' + roomId.id + '/cmpeul32y0000yyud7tymzxse', id: roomId.id})
        socket.join(roomId.id)
        io.to(roomId.id).emit('welcome')
        console.log('lobby:', lobby.size)
        // io.to(socket.id).emit('game', 'New Game');
    }

    socket.on('disconnect', () => {
        console.log('disconnected:')
        lobby.delete(socket.id)
    })
    
    // socket.join('multiplayer')
    // socket.on('multiplayer', (id, msg) => {
    //     console.log('id:', id);
    //     console.log('msg:', msg)
    //     console.log('clientCountInMultiplayer', clientCountInMultiplayer('multiplayer'))
    // })
    // const ipAddress = socket.handshake.address
    // console.log(ipAddress)
    // console.log('totalCount', totalCount())
})
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use('/game', game)
app.use('/leadboard', leadboardRouter)

server.listen(process.env.PORT, (err) => {
    if(err) console.error(err)
    console.log(`listen at http://localhost:${process.env.PORT}`)
})