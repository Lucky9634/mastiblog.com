const mongoose = require("mongoose");


const postModel = mongoose.Schema({
    image : {
        type : Buffer,
        required : [true, "Image Is Required."]
    },
    title : {
        type : String,
        required : [true, "Title Is Required."]
    },
    content : {
        type : String,
        required : [true, "Content Is Required"]
    },
    date : {
        type : Date,
        default : Date.now
    },
    like : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    }],
    user : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    }]

})

module.exports = mongoose.model("post", postModel)