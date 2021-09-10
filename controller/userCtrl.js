const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userCtrl = {
  register: async (req, res) => {
    try {
      const { fullName, userName, password, rePassword } = req.body;

      if (!fullName || !userName || !password || !rePassword) {
        return res.status(400).json({ msg: "Invalid Creadentials" });
      }
      const existingUser = await User.findOne({ userName });
      if (existingUser) {
        return res.status(400).json({ msg: "User Already Exists" });
      }
      if (password.length < 4) {
        return res.status(400).json({ msg: "Password must be 4 lengths long" });
      }
      if (password !== rePassword) {
        return res.status(400).json({ msg: "Password Doesn't Match" });
      }
      const hashPass = await bcrypt.hash(password, 10);
      const newUser = new User({
        fullName,
        userName,
        password: hashPass,
      });

      await newUser.save();

      res.json({ msg: "User Added" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { userName, password } = req.body;
      if (!userName || !password) {
        return res.status(400).json({ msg: "Invalid Creadentials" });
      }
      const user = await User.findOne({ userName });
      if (!user) {
        return res.status(400).json({ msg: "User Doesn't Exists" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Password Doesn't Match" });
      }
      const accessToken = createAccessToken({ id: user._id });
      const refreshToken = createRefreshToken({ id: user._id });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      res.json({ accessToken });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updatePassword: async (req, res) => {
    try {
      const { userName, currentPassword, password, rePassword } = req.body;
      if (!userName || !currentPassword || !password || !rePassword) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }
      const user = await User.findOne({ userName });
      if (!user) {
        return res.status(400).json({ msg: "User not Found" });
      }
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Current Password not Matched" });
      }
      if (password.length < 4) {
        return res.status(400).json({ msg: "Password must be 4 Lengths Long" });
      }
      if (password !== rePassword) {
        return res.status(400).json({ msg: "Password Doesn't Match" });
      }
      const hashPass = await bcrypt.hash(password, 10);
      await User.findOneAndUpdate(
        { _id: req.params.id },
        {
          password: hashPass,
        }
      );
      res.json({ msg: "Password Changed" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  refreshToken: async (req, res) => {
    const rf_token = req.cookies.refreshToken;
    if (!rf_token) {
      return res.status(400).json({ msg: "Please Login or Register" });
    }
    jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(400).json({ msg: "Please Login or Register" });
      }
      const accessToken = createAccessToken({ id: user.id });

      res.json({ accessToken });
    });
  },
  logOut: async (req, res) => {
    try {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none",
      });
      return res.json({ msg: "Logged Out" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");
      if (!user) {
        return res.status(400).json({ msg: "User Doesn't Exists" });
      }
      res.json({ user });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};

const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

module.exports = userCtrl;
