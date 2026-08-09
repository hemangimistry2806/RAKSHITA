const authService = require("../services/authService");
const { success } = require("../utils/apiResponse");

const register = async (req, res) => {
  const result = await authService.register(req.body);
  return success(res, result, 201, "Registration successful");
};

const login = async (req, res) => {
  const result = await authService.login(req.body);
  return success(res, result, 200, "Login successful");
};

const me = async (req, res) => success(res, { user: req.user });

module.exports = { register, login, me };
