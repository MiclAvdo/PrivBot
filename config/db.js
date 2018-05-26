let mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL);

let db = mongoose.connection;

db.once('open', () => {
    console.log(`MongoDB ${db.name} logged in at ${db.host}:${db.port}`);
});