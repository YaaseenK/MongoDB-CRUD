const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/bookStore', {
    // useNewURLParser: true,
    // useUnifiedTopology: true,
})

// export connection 
module.exports = mongoose.connection;