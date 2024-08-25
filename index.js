const mongoose = require("mongoose");

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI)//used connect for connecting mongoose
        console.log('MongoDB connected...');
    }catch (err){
        console.error('MongoDB  connected',err);
        throw err;
    }
}
module.exports=connectDB;