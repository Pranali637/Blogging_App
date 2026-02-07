const { validateToken } = require("../services/authentication")

function checkForAuthenticationOfCookie(cookieName){
    return (req,res,next)=>{
        const tokenValue=req.cookies[cookieName]
        if(!tokenValue){
            req.user=null;
            return next()
        }
        try{
         const Payload=validateToken(tokenValue)
         req.user= Payload
         console.log(Payload)
        }
        catch(error){}
         next()
    }
}
module.exports={
    checkForAuthenticationOfCookie,
}