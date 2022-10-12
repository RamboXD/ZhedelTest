const express = require("express");
const router = express.Router();

const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");
const authMiddleware = require("../middleware/authMiddleware");

// router
//   .route("/")
//   .get(getUsers)
//   .post(createUser);
router.get("/:id", authMiddleware, getUser);
// router
//   .route("/:id")
//   .get(getUser)
//   .patch(updateUser)
//   .delete(deleteUser);

module.exports = router;