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

io.on('connection', (socket) => {
    socket.on('test', (msg) => {
        console.log('msg:', msg)
        console.log('no no no')
    })
    console.log('woupi')
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