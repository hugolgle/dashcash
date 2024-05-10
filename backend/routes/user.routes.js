const express = require("express");
const { getUsers, loginUser, addUser, editUser, deleteUser } = require("../controllers/user.controller");
const router = express.Router();

router.get("/", getUsers);
router.post("/login", loginUser);
router.post("/add", addUser);
router.put("/edit/:id", editUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;