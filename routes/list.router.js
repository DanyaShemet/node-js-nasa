const {
    getList,
    getListById,
    postList,
} = require('../controllers/list.controller')
const { Router } = require('express')

const listRouter = Router()

listRouter.use((req, res, next) => {
    console.log(req.ip, 'ip')
    next()
})

listRouter.get('/', getList)
listRouter.get('/:id', getListById)
listRouter.post('/', postList)

module.exports = listRouter
