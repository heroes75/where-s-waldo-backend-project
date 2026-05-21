const {Router} = require('express')
const { addRecord, getAllRecord } = require('../controllers/leadboardController')

const leadboardRouter = Router()

leadboardRouter.post('/:id', addRecord)
leadboardRouter.get('/', getAllRecord)

module.exports = leadboardRouter
