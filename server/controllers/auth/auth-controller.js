const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User.js');
const { Op } = require('sequelize');
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const duplicate = await User.findOne({
      where: {
        [Op.or]: [
          { userName: { [Op.like]: userName } },
          { email: { [Op.like]: email } },
        ],
      },
    });

    if (duplicate) {
      return res.json({
        success: false,
        message: 'Username or email already exists with different user.',
      });
    }

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
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({
      where: { email: email },
    });
    if (!checkUser) {
      return res.json({
        success: false,
        message: 'User does not exist!',
      });
    }
    const checkPassword = await bcrypt.compare(password, checkUser.password);
    if (!checkPassword) {
      return res.json({
        success: false,
        message: 'Incorrect password!',
      });
    }
    const token = jwt.sign(
      {
        id: checkUser.id,
        role: checkUser.role,
        email: checkUser.email,
      },
      'CLIENT_SECRET_KEY',
      { expiresIn: '15d' }
    );
    res.cookie('token', token, { httpOnly: true, secure: false }).json({
      success: true,
      message: 'Logged In Successfully',
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser.id,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Some error occured' });
  }
};

const logoutUser = async (req, res) => {
  res.clearCookie('token').json({
    success: true,
    message: 'Logged Out Successfully',
  });
};

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      success: false,
      message: 'Unauthorised user!',
    });

  try {
    const decoded = jwt.verify(token, 'CLIENT_SECRET_KEY');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Unauthorised user!',
    });
  }
};
module.exports = { registerUser, loginUser, logoutUser, authMiddleware };
