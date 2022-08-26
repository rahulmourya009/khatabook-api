import UserModel from "../models/UserModel";

const express = require("express");
const router = express.Router();

router.get("/signup", async (req, res) => {
  try {
    var outputData = await UserModel.signup(req.body);
    res.status(outputData.status).json(outputData);
  } catch (error) {
    res.status(500).json(error);
  }
});
