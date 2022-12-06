const { connect , connection } = require('mongoose');
const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:20717/socialnetworkDB';

connect(connectionString, {
    useNewUrlParser: true,
    useInofoedTopology: true,
});

module.exports = connection;