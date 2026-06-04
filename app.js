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

io.of('/').on('connection', (socket) => {
    console.log('user connected:')
    console.log('lobby:', lobby.size)
        if (lobby.size  === 0) {
        var id = randomUUID() + ''
        roomId.id = id
        console.log('socket.id:', socket.id)
        socket.broadcast.emit('lobby', { msg: 'Please Wait...', nextGame: null, id})
        socket.emit('lobby', { msg: 'Please Wait...', nextGame: null, id})
        lobby.add(socket.id)
        console.log('lobby:', lobby.size)
    } else if(lobby.size  === 1) {
        console.log('socket.id:', socket.id)
        lobby.add(socket.id)
        socket.broadcast.emit('lobby', {msg: 'you\'re connected now to a player', nextGame: '/multiplayer/' + roomId.id + '/cmpeul32y0000yyud7tymzxse', id: roomId.id})
        socket.emit('lobby', {msg: 'you\'re connected now to a player', id: roomId.id, nextGame: '/multiplayer/' + roomId.id + '/cmpeul32y0000yyud7tymzxse', id: roomId.id})
        console.log('lobby:', lobby.size)
        // io.to(socket.id).emit('game', 'New Game');
    }

    socket.on('disconnect', () => {
        console.log('disconnected:')
        lobby.delete(socket.id)
    })
})


io.of('/multiplayer').on('connection', socket => {
    console.log('user connected to plays:')
        console.log('socket.id:', socket.id)
    socket.on('join-room', (roomId, userId) => {
        console.log('roomId, userId:', roomId, userId)
        socket.join(roomId)
        socket.on('multiplayer', msg => {
            socket.broadcast.emit('multiplayer', msg)
        })
        socket.on(roomId, (targets, isFound, name) => {
            socket.broadcast.emit(roomId, targets, isFound, name)
        })
        socket.on(roomId + '-target', targets => {
            console.log('targets:', targets)
            socket.broadcast.emit(roomId + '-target', targets)
        })
        socket.on(roomId + '-connect', isConnected => {
            console.log('isConnected:', isConnected)
            socket.broadcast.emit(roomId + '-connect', isConnected)
        })
        socket.on('disconnect', () => {
            console.log(`player disconnect:`)
            socket.broadcast.emit(roomId + '-connect', false)
        })
        socket.to(roomId).emit('connected')
    })

    
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