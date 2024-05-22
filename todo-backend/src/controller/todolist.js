const { PrismaClient } = require("@prisma/client");
const { verifyStatus } = require("../validation/todolist");
const prisma = new PrismaClient();

async function createList(req, res) {
  const { title, description, status } = req.body;
  const user = req.user;
  if (verifyStatus(status)) {
    return res.status(400).json({ status: false, message: "Invalid status" });
  }
  const list = await prisma.todolist.create({
    data: {
      title,
      description,
      status,
      user_id: user.id,
    },
  });
  res.status(201).json(list);
}

async function getLists(req, res) {
  const user = req.user;
  const { search, status } = req.query;
  if (status && verifyStatus(status)) {
    return res.status(400).json({ status: false, message: "Invalid status" });
  }
  const condition = {
    user_id: user.id,
  };
  if (search) {
    condition.title = {
      contains: search,
    };
  }
  if (status) {
    condition.status = status;
  }
  const lists = await prisma.todolist.findMany({
    where: condition,
  });
  return res.status(200).json(lists);
}

async function updateStatus(req, res) {
  const user = req.user;
  const { id, status } = req.body;
  if (!id || !status) {
    return res
      .status(400)
      .json({ status: false, message: "Id and status are required" });
  }
  const list = await prisma.todolist.findUnique({
    where: {
      user_id: user.id,
      id: id,
    },
  });
  if (!list) {
    return res.status(404).json({ status: false, message: "List not found" });
  }
  if (verifyStatus(status)) {
    return res.status(400).json({ status: false, message: "Invalid status" });
  }
  const updatedList = await prisma.todolist.update({
    where: {
      id: id,
    },
    data: {
      status: status,
    },
  });
  return res.status(200).json(updatedList);
}

async function deleteList(req, res) {
  const user = req.user;
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ status: false, message: "Id is required" });
  }
  const list = await prisma.todolist.findUnique({
    where: {
      user_id: user.id,
      id: id,
    },
  });
  if (!list) {
    return res.status(404).json({ status: false, message: "List not found" });
  }
  await prisma.todolist.delete({
    where: {
      id: id,
    },
  });
  return res.status(200).json({ status: true, message: "List deleted" });
}

module.exports = { createList, getLists, updateStatus, deleteList };
