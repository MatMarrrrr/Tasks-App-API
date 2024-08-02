const express = require("express");
const router = express.Router();
const {
  createGroup,
  updateGroup,
  deleteGroup,
  addUserToGroup,
  removeUserFromGroup,
} = require("../controllers/group.controller");
const { protect } = require("../middlewares/authMiddleware");

router.post("/", protect, createGroup);
router.put("/:id", protect, updateGroup);
router.delete("/:id", protect, deleteGroup);
router.post("/:groupId/addUser", protect, addUserToGroup);
router.post("/:groupId/removeUser", protect, removeUserFromGroup);

module.exports = router;
