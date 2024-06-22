const express=require("express");
const connectDB = require("./config/dbConnection");
const app=express();
const bodyparser=require("body-parser");
const UserRouter=require('./routers/user_router');
const cors=require("cors");

const port=5000;
connectDB();
app.use(cors());
app.use(bodyparser.json());
app.use('/',UserRouter);
// app.get("/",(req,res)=>{
//     res.send("Welcome buddy");
// });


app.listen(port,()=>{
    console.log(`server listening on port ${port}`);
})