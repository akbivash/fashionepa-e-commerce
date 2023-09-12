const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  getStats,
} = require("../controllers/user");

router.get("/", getUsers);
router.get("/stats", getStats)
router.get("/:id", verifyTokenAndAdmin, getUser);

router.put("/:id", verifyTokenAndAuthorization, updateUser);
router.delete("/:id", verifyTokenAndAdmin, deleteUser);


 

module.exports = router;
