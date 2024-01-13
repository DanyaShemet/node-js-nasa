const express = require('express')
const listRouter = require('./routes/list.router')
const messagesRouter = require('./routes/messages.router')
const path = require('path')
const PORT = 3000

const app = express()

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

app.use((req, res, next) => {
    console.log('use')
    const start = Date.now()
    next()
    const delta = Date.now() - start
    console.log(`${req.baseUrl}${req.url} ${req.method} ${delta}ms`)
})

app.use('/site', express.static(path.join(__dirname, 'public')))
app.use(express.json())

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Express',
        caption: 'Hello, World!',
    })
})

app.use('/list', listRouter)
app.use('/messages', messagesRouter)

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`)
})

// REST - REpresentational State Transfer
