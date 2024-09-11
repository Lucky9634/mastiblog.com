const mongoose = require("mongoose");

const dbconnection = ()=>{
    try {
        mongoose.connect(`${process.env.MONGODB_ATLAS_CONNECTION_KEY}`)
        console.log("Your Data Base Has Connected..!")
    } catch (error) {
        console.log("Your Data Base Has Not Connected..!")
    }
}


module.exports = dbconnection