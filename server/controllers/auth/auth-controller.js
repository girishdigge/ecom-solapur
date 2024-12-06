const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User.js');

const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
    });
    if (user) {
      res
        .status(200)
        .json({ success: true, message: `new user ${userName} created` });
    } else {
      res
        .status(400)
        .json({ success: false, message: 'Invalid user data received,' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Some error occured' });
  }
};
const login = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Some error occured' });
  }
};

module.exports = { registerUser };
