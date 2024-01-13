const path = require('path')
function getMessages(req, res) {
    // const file = path.join(__dirname, '..', 'public', 'img', 'skimountain.jpg')
    // res.sendFile(file)
    res.render('messages', {
        friend: 'Elon',
        title: 'Mssaxa',
    })
}
function postMessages(req, res) {
    res.send('POST /messages')
}

module.exports = {
    getMessages,
    postMessages,
}
