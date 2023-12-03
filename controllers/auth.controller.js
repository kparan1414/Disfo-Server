const AuthService = require("../services/auth.service");
const ASInstance = new AuthService();

const postSignup = async(req,res)=>{
    try{
        const result = await ASInstance.signup(req.body);
        res.json(result);
    }
    catch(err){
        console.log("Couldn't signup!",err);
        res.status(500).json({message:err.message});
    }
}

const postLogin = async(req,res)=>{
    try{
        const result = await ASInstance.login(req.body);
        if(result.isLoggedIn){
            res.cookie("token",result.token,{
                maxAge:1000*60*60,
            })
            res.json(result);
        }
        else res.sendStatus(403);
    }
    catch(err){
        console.log("Couldn't login!",err);
        res.status(500).json({message:err.message});
    }
}

module.exports = {postSignup, postLogin};