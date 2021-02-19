const mongoose = require("mongoose");
const config = require("config");
const db = config.get("MongoDB_Url");

const connectDB = async ()=>{
    try{
        await mongoose.connect(db,
            {
                useUnifiedTopology : true,
                useNewUrlParser : true,
                useCreateIndex : true,
            
            });
        console.log("MongoDB Connected Successfully...");
    }catch(err){
        console.error(err.message);
        //Exit Process with failure
        process.exit(1);
    }
}

module.exports = connectDB;