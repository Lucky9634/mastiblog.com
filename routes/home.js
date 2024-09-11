const express = require("express")
const router = express.Router();
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const isLoggedIn = require("../middlewares/isLoggedIn")
const postModel = require("../models/post")


router.get("/", isLoggedIn, async (req, res) => {
    let posts = await postModel.find();
    res.render("home", { posts, LoggedIn: false })
})
router.get("/login", (req, res) => {
    res.render("login")
})
router.get("/create", (req, res) => {
    res.render("create")
})
router.get("/card/:id", isLoggedIn, async (req, res) => {
    let post = await postModel.findOne({ _id: req.params.id }).populate("user")
    res.render("content", { post, LoggedIn: false })
})
router.get("/user/post/:id", isLoggedIn, async (req, res) => {
    let post = await postModel.findOne({ _id: req.params.id }).populate("user")
    res.render("content", { post, LoggedIn: false })
})

router.post("/user/create", async (req, res) => {
    try {
        let { name, email, password, conPassword } = req.body;
        if (password !== conPassword) {
            return res.send("Your Conform Password Is Not Match..!")
        }

        let user = await userModel.findOne({ email });
        if (user) return res.send("User Already Exit. Please Login..!")

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                let user = await userModel.create({
                    name,
                    email,
                    password: hash
                })

                let token = jwt.sign({ email: user.email, userid: user._id }, process.env.JWT_SECRET_KEY)
                res.cookie("token", token);
                res.redirect("/home")
            })
        })

    } catch (error) {
        res.send(message.error)
    }
})


router.post("/login", async (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await userModel.findOne({ email });
        if (!user) return res.redirect("/home/create")
        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                let token = jwt.sign({ email: user.email, userid: user._id }, process.env.JWT_SECRET_KEY);
                res.cookie("token", token);
                res.redirect("/home")
            } else {
                res.send("Enter the currect cridensials.");
            }
        })
    } catch (error) {
        res.send(message.error)
    }

})


router.get("/logout", (req, res) => {
    let token = "";
    res.cookie("token", token);
    res.redirect("/home/login")
})


module.exports = router