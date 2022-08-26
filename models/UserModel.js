import user from "../mongooseModel/User";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export default {
  async signup(data) {
    try {
      if (!data.firstName || !data.lastName || !data.email || !data.password) {
        return {
          status: 400,
          message: "Missing required fields",
        };
      }
      const isEmailExist = await user.findOne({ email: data.email });
      if (isEmailExist) {
        return {
          status: 400,
          message: "Email already exits",
        };
      }
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(data.password, salt);
      const newUser = new user(data);
      const saveUser = await newUser.save();
      if (saveUser && saveUser.id) {
        return {
          status: 200,
          message: "User created successfully",
        };
      }
    } catch (error) {
      throw error;
    }
  },
  async login(data) {
    try {
      if (!data.email || !data.password) {
        return {
          status: 400,
          message: "Missing required fields",
        };
      }
      const userData = await user.findOne({ email: data.email });
      if (!userData) {
        return {
          status: 400,
          message: "User not found",
        };
      }
      const isPasswordMatch = await bcrypt.compare(
        data.password,
        userData.password
      );
      if (!isPasswordMatch) {
        return {
          status: 400,
          message: "Password is incorrect",
        };
      }
    } catch (error) {
      throw error;
    }
  },
};
