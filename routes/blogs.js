const express = require('express')
const router = express.Router()
const postModel = require("../models/post")
const upload = require("../configs/imageUpload")
const isLoggedIn = require("../middlewares/isLoggedIn")


router.get("/", isLoggedIn, async (req, res) => {
    let user = await req.user.populate("posts");
    res.render("blogs", { user , LoggedIn: false })
})

router.post("/post", isLoggedIn, upload.single("image"), async (req, res) => {
    let { title, content } = req.body;
    let user = req.user
    let post = await postModel.create({
        image: req.file.buffer,
        title,
        content,
        user: user._id
    })


    user.posts.push(post._id);
    await user.save()
    res.redirect("/blogs")

})

router.get("/delete/:id", isLoggedIn, async (req, res) => {
    let post = await postModel.deleteOne({ _id: req.params.id });
    res.redirect("/blogs")

})


router.get("/edit/:id", isLoggedIn, async (req, res) => {
    let post = await postModel.findOne({ _id: req.params.id });
    res.render("edit", { post , LoggedIn: false })

})
router.post('/post/edit/:postId', isLoggedIn, upload.single("image"), async(req, res) => {
    let { title, content } = req.body;
    let image = req.file.buffer
    let post = await postModel.findOneAndUpdate({_id: req.params.postId}, {image, title, content}, {new: true});
    res.redirect("/blogs")
})

module.exports = router