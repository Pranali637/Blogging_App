const express=require("express")
const User=require("../models/user.models.js");
const Blog = require("../models/Blog.models.js");
const router=express.Router();
router.get("/signup",(req,res)=>{
    return res.render("signup");
})
router.post("/signin",async(req,res)=>{
    const {email,Password}=req.body;
    try {
        const token=await User.matchPasswordAndToken(email,Password)
        
        return res.cookie("token",token,{
           httpOnly: true,
           path: "/",          
}).redirect("/")
    } catch (error) {
        return res.render("signin",{
           error: "Invalid Password"
        })
    }
    
})
router.get("/signin",(req,res)=>{
    return res.render("signin");
})
router.post("/signup", async (req,res)=>{
    try {
        const {fullName,email, Password } = req.body;
        await User.create({fullName, email, Password });
        res.redirect("/signin");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating user");
    }
})
router.get("/",async(req,res)=>{
    const allBlogs=await Blog.find({});
    return res.render("home",{
        user:req.user,
        Blogs:allBlogs,
    });
})
router.get("/logout",(req,res)=>{
    return res.clearCookie("token").redirect("/")
})
module.exports=router;