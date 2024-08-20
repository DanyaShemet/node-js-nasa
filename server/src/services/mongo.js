const mongoose = require('mongoose')

const MONGO_URL =
    'mongodb+srv://nasa-api:HZT3b2hKakeawWhL@nasacluster.wpnjwhv.mongodb.net/?retryWrites=true&w=majority&appName=NASACluster'

mongoose.connection.once('open', () => {
    console.log('Mongoose open!')
})

mongoose.connection.on('error', (err) => {
    console.error(err)
})

async function mongoConnect() {
    await mongoose.connect(MONGO_URL)
}

async function mongoDisconnect() {
    await mongoose.disconnect()
}

module.exports = {
    mongoConnect,
    mongoDisconnect,
}
