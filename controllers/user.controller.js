const UserService = require("../services/user.service");

const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userData = await UserService.registerUser(email, password);
    res.status(201).json(userData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userData = await UserService.loginUser(email, password);
    res.status(200).json(userData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
};
