require('dotenv/config')
const express = require('express')
const cors = require('cors')
const {createServer} = require('node:http')
const { Server } = require('socket.io')
const game = require('./routes/gameRouter')
const leadboardRouter = require('./routes/leadboardRouter')


const app = express()
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173/", 'http://127.0.0.1:5173']
    }
})

function totalCount() {
    return io.of("/").sockets.size;
}

function clientCountInMultiplayer(id) {
    return io.of("/").adapter.rooms.get(id)?.size || 0;
}

io.on('connection', (socket) => {
    
    socket.join('multiplayer')
    socket.on('multiplayer', (id, msg) => {
        console.log('id:', id);
        console.log('msg:', msg)
        console.log('clientCountInMultiplayer', clientCountInMultiplayer('multiplayer'))
    })
    const ipAddress = socket.handshake.address
    console.log(ipAddress)
    console.log('totalCount', totalCount())
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