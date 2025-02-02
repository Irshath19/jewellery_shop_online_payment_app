const mongoose = require("mongoose");
require("dotenv").config(); 
const connectDB= async () =>{
    try{
        const connect=await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Database Conencted: ",connect.connection.host,connect.connection.name);
    }
    catch(err){
        console.log(err);
        process.exit(1);

    }
}

module.exports=connectDB;