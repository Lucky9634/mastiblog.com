
const mongoose = require('mongoose');

const userModel = mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: [true, "Full Name Is Required."]
    },
    email: {
        type: String,
        required: [true, "Email Is Required."]
    },
    password: {
        type: String,
        required: [true, "Password Is Required."]
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "post"
    }]
});

module.exports = mongoose.model("user", userModel);