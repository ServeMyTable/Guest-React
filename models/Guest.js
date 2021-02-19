const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const guestSchema = new Schema({

    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    Phone:{
        type : String
    },
    table : {
        type : String
    }

});

const Guest = mongoose.model('Guest',guestSchema);

module.exports = Guest;