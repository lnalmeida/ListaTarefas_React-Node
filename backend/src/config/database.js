const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.set('useUnifiedTopology', true)
module.exports = mongoose.connect('mongodb://localhost/todo', { useNewUrlParser: true })