const UserService = require('../services/user_services');

exports.register = async (req, res, next) => {
    try {
        const { name, email, password, city } = req.body;
        const successResponse = await UserService.registerUser(name, email, password, city);
        res.json({ status: true, success: "User Registered Successfully" });
    } catch (err) {
        next(err); 
    }
};
exports.login = async (req, res, next) => {
    try {
        const {email, password } = req.body;
        const user=await UserService.checkUser(email);
        if(!user)
        {
            throw new Error("User doesn't exist");
        }
        const isMatch= await user.comparePassword(password);
        if(!isMatch)
        {
            throw new Error("Invalid Password");
        }

        let tokenData={_id:user._id,email:user.email};

        const token = await UserService.generateToken(tokenData,"secretKey",'1h');

        res.status(200).json({status:true,token:token});
    } catch (err) {
        next(err); 
    }
};
