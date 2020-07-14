//require mongoose
const mongoose = require('mongoose');
//connect Database
mongoose.connect('mongodb://localhost/contacts_list_db');
//aquire connection to check if successful
const db = mongoose.connection;
// error
db.on('error',console.error.bind(console,'error connecting to db'));
db.once('open',function(){
    console.log('Successfully Connected to the database');
})