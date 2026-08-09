const prisma = require("../config/prisma");
const { success } = require("../utils/apiResponse");
const { sanitizeUser } = require("../utils/sanitize");

const getMe = async (req, res) => success(res, { user: req.user });

const updateMe = async (req, res) => {
  const user = await prisma.user.update({
    where: { id: req.user.id },
    data: {
      ...req.body,
      dateOfBirth: req.body.dateOfBirth === undefined
        ? undefined
        : req.body.dateOfBirth === null
          ? null
          : new Date(req.body.dateOfBirth)
    }
  });

  return success(res, { user: sanitizeUser(user) });
};

module.exports = { getMe, updateMe };
