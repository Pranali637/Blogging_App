const mongoose=require("mongoose");
async function connecToMongodb(url){
    return mongoose.connect(url);
}
module.exports={
    connecToMongodb,
};