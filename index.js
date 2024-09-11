const express = require("express");
const dotenv = require("dotenv").config()
const expressSession = require("express-session")
const flash = require("connect-flash")
const path = require("path")
const home = require("./routes/home")
const blogs = require("./routes/blogs")
const dbconnection = require("./configs/dbConnect")
const cookieParser = require("cookie-parser")
const app = express();
const multer = require("multer")

// Data Base Connection...
dbconnection();

// Use Env Module Exports Element...
const PORT = process.env.PORT

// Middlewares

app.use(cookieParser())
app.use(express.json())
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: true }))
app.set('view engine', "ejs")
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: `${process.env.FLASH_MESSAGE_KEY}`
}))

app.use('/home', home)
app.use('/blogs', blogs)

app.listen(PORT, () => { console.log(`Server Is Running At PORT http://localhost:${PORT}/home}`) })