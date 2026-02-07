require("dotenv").config();

const express=require("express");
const mongoose=require("mongoose");
const path=require("path");
const cookieParser=require("cookie-parser");
const UserRoute=require("./routes/user.routes.js")
const blogRoute=require("./routes/blog.routes.js")
const{connecToMongodb}=require("./connection.js");
const { checkForAuthenticationOfCookie } = require("./middlewares/authentication.middlewares.js");
const app=express();
const port=process.env.PORT || 8000;
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())
app.use(express.static(path.resolve("./public")))
app.use(checkForAuthenticationOfCookie("token"))
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

connecToMongodb(process.env.MONGO_URL)
.then(() => console.log("MongoDB connected"))
.catch(err => console.error(err));


app.use("/",UserRoute);
app.use("/",blogRoute);
app.listen(port,()=>{
console.log("Server Started")
})