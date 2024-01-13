const { Router } = require('express')
const {
    getMessages,
    postMessages,
} = require('../controllers/messages.controller')

const messagesRouter = Router()

messagesRouter.get('/', getMessages)
messagesRouter.post('/', postMessages)

module.exports = messagesRouter
