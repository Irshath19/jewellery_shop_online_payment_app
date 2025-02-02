const mongoose=require("mongoose");
const db=require('../config/dbConnection');
const bcrypt=require('bcrypt');
const {Schema} = mongoose;

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        lowercase:true,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    }

});

userSchema.pre('save',async function()
{
    try{
        var user=this;
        const salt=await(bcrypt.genSalt(10));
        const hashpass=await bcrypt.hash(user.password,salt);
        user.password=hashpass;


    }catch(err)
    {
        throw err;
    }
});

userSchema.methods.comparePassword=async function(userPassword)
{
    try {
        const isMatch=await bcrypt.compare(userPassword,this.password);
        return isMatch;
    } catch (err) {
        throw err;
        
    }
}

const userModel = mongoose.model('user',userSchema);

module.exports=userModel;