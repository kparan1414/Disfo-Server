const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const UserService = require("./user.service");
const USInstance = new UserService();

class AuthService {
  signup = async (user) => {
    const hashedPassword = await this.hashPassword(user.password);
    const data = {
      ...user,
      password: hashedPassword,
    };
    console.log(data);
    const result = await USInstance.register(data);
    return result;
  };

  hashPassword = async (password) => {
    const salt = await bcrypt.genSalt();
    // console.log(salt);
    const hash = await bcrypt.hash(password, salt);
    // console.log(hash);
    return hash;
  };

  login = async({username,password})=>{
    const isPasswordSame = await this.verifyPassword(username,password);
    if(isPasswordSame){
      return {isLoggedIn:true,token:this.generateToken(username)};
    }
    return {};
  }

  verifyPassword = async(username,password)=>{
    const user = await USInstance.findByUsername(username);
    if(!user) return false; 
    // case of logging in without even registering first i.e. there's no such user in db

    const storedPassword = user.password;
    const isPasswordSame = await bcrypt.compare(password,storedPassword);

    console.log("Password:",password);
    console.log("Stored Password:",storedPassword);
    console.log("isPasswordSame:",isPasswordSame);

    if(isPasswordSame) return true;
    return false;
  }

  generateToken = (username)=>{
    const payload = {
      username
    }
    const options = {
      expiresIn:"1h",
    }
    const secret = process.env.JWT_SECRET;
    const token = JWT.sign(payload,secret,options);
    return token;
  }
}

module.exports = AuthService;
