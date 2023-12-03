const Users = require("../models/user.model");

class UserService {
  register = async (user) => {
    try {
      const { fullName, email, username, password } = user;
      const newUser = new Users({ email, username, fullName, password });
      // console.log("newUser eexec");
      const result = await newUser.save();
      // console.log("saved");
      return result;
      // console.log("returned");
    } catch (error) {
      throw error;
    }
  };

  findAll = async () => {
    const userResult = await Users.find({});
    return userResult;
  };

  findByUsername = async (username) => {
    try {
      const userResult = await Users.findOne({ username });
      return userResult;
    } catch (error) {
      throw error;
    }
  };
}

mod