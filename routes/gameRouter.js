const {Router} = require('express')
const { getAllGame, getGame, verifyTargets } = require('../controllers/gameController')

const game = Router()

game.get('/', getAllGame)
game.get('/:id', getGame)
game.post('/:id', verifyTargets)

module.exports = game