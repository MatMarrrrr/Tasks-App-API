const User = require("../models/user.model");
const generateToken = require("../config/auth");

class UserService {
  async registerUser(email, password) {
    const userExists = await User.findOne({ email });

    if (userExists) {
      throw new Error("User already exists");
    }

    const user = await User.create({
      email,
      password,
      created_at: new Date(),
    });

    if (!user) {
      throw new Error("Invalid user data");
    }

    return {
      id: user._id,
      email: user.email,
      token: generateToken(user._id),
    };
  }

  async loginUser(email, password) {
    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      throw new Error("Invalid email or password");
    }

    return {
      id: user._id,
      email: user.email,
      token: generateToken(user._id),
    };
  }

  async findUsersByEmailSubstring(substring) {
    if (!substring) {
      throw new Error("Substring is required");
    }

    const users = await User.find({
      email: { $regex: substring, $options: "i" },
    });

    return users.map((user) => ({
      id: user._id,
      email: user.email,
    }));
  }
}

module.exports = new UserService();
