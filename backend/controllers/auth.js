const User = require("../models/User");
const jwt = require('jsonwebtoken')

const dotenv = require('dotenv')
dotenv.config()
// Register

const registerUser = async (req, res) => {

  try {
    let user = await User.findOne({ username: req.body.username });
    let email = await User.findOne({email: req.body.email });
    if (user) {
      res.status(400).json({ msg: "User already exist" })
      return;
    }
    if(email){
      res.status(400).json({ msg: "email already exist" })
      return;
    }

    const newUser = await User.create({ ...req.body })
    res.status(201).json({ user:newUser})
  } catch (err) {
    res.status(500).json({ msg: 'error creating user', err })
    return
  }
}

// login
const loginUser = async (req, res) => {
  try {
    let user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(400).json({ msg: "User not found" })
      return;
    }
    const isPasswordCorrect = await user.comparePassword(req.body.password)
    if (!isPasswordCorrect) {
      res.status(400).json({ msg: 'password does not match' })
      return;
    }
    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin
      },
      process.env.TOKEN_KEY
    )
    res.header("auth-token", token)
    await res.json({ auth: true, token: token, user })
  } catch (err) {
    res.json({ msg: "please fill form properly" })
  }
};

// logout
const logoutUser = async (req, res) => {
  try {
    let user = await User.findOne({ username: req.body.username });
    res.removeHeader('auth-token')
    res.status(200).send({ auth: false, token: null, user })

  } catch (err) {
    res.send(err)
    return
  }
  // res.status(200).send({ auth: false, token: null })
};
module.exports = { registerUser, loginUser, logoutUser };
