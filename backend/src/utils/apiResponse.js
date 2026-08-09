const success = (res, data = {}, statusCode = 200, message) => {
  const body = { success: true, data };
  if (message) body.message = message;
  return res.status(statusCode).json(body);
};

const failure = (res, message = "Something went wrong", statusCode = 500, details) => {
  const body = { success: false, message };
  if (details) body.details = details;
  return res.status(statusCode).json(body);
};

module.exports = { success, failure };
