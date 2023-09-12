const User = require("../models/User");
const CryptoJS = require("crypto-js");

const getUsers = async (req, res) => {
  const query = req.query.new;
  const allUsers = query
    ? await User.find().sort({ _id: -1 }).limit(2)
    : await User.find();
  await res.send(allUsers);
};

const getUser = async (req, res) => {
 try{
  let user = await User.findById(req.params.id);
  await res.json(user);
 }catch(err){
  res.json(err)
  return
 }
};

const updateUser = async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASSWORD_SEC_KEY
    ).toString();

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.json(updatedUser);
    } catch (err) {
      res.json("email or username already used");
    }
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.json({ msg: "user deleted" });
  } catch (err) {
    res.json(err);
    return;
  }
};

const getStats = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data =await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      { $project: { month: { $month: "$createdAt" } } },
      { $group: { _id: "$month", total: { $sum: 1 } } },
    ]);
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { getUser, getUsers, updateUser, deleteUser, getStats };
