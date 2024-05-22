const express = require("express");
const {
  createList,
  getLists,
  updateStatus,
  deleteList,
} = require("../controller/todolist");
const router = express.Router();

router.post("/create", createList);
router.post("/update/status", updateStatus);
router.post("/delete", deleteList);
router.get("/get", getLists);

module.exports = router;
