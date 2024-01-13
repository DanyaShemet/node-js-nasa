const model = require('../models/list.model')

function getList(req, res) {
    res.json(model)
}

function getListById(req, res) {
    const listObj = model.find((item) => item.id === Number(req.params.id))
    if (!listObj) {
        res.status(404).json({
            message: 'Not found',
        })
    } else {
        res.status(200).json(listObj)
    }
}

function postList(req, res) {
    if (!req.body.name) {
        return res.status(400).json({
            error: 'Name is required',
        })
    }

    const newItem = {
        name: req.body.name,
        id: model.length + 1,
    }

    model.push(newItem)

    res.status(200).json(newItem)
}

module.exports = {
    getList,
    getListById,
    postList,
}
