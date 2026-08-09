const prisma = require("../config/prisma");
const { AppError } = require("../middleware/errorHandler");
const { success } = require("../utils/apiResponse");

const listContacts = async (req, res) => {
  const contacts = await prisma.emergencyContact.findMany({
    where: { userId: req.user.id },
    orderBy: [{ priority: "asc" }, { createdAt: "asc" }]
  });
  return success(res, { contacts });
};

const createContact = async (req, res) => {
  const contact = await prisma.emergencyContact.create({ data: { ...req.body, userId: req.user.id } });
  return success(res, { contact }, 201);
};

const updateContact = async (req, res) => {
  const existing = await prisma.emergencyContact.findFirst({ where: { id: req.params.id, userId: req.user.id } });
  if (!existing) throw new AppError("Contact not found", 404);
  const contact = await prisma.emergencyContact.update({ where: { id: req.params.id }, data: req.body });
  return success(res, { contact });
};

const deleteContact = async (req, res) => {
  const existing = await prisma.emergencyContact.findFirst({ where: { id: req.params.id, userId: req.user.id } });
  if (!existing) throw new AppError("Contact not found", 404);
  await prisma.emergencyContact.delete({ where: { id: req.params.id } });
  return success(res, { id: req.params.id });
};

module.exports = { listContacts, createContact, updateContact, deleteContact };
