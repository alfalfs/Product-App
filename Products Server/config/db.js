const mongoose = require('mongoose');
const db = 'mongodb://localhost:27017/ProductDb';
mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
const dbStatus = mongoose.connection
dbStatus.on('error', error => console.error(error))
dbStatus.once('open', () => console.log('Connected to Mongoose'))

module.exports = mongoose;