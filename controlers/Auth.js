const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

require("dotenv").config();

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already Exist",
      });
    }

    let hashpassword;
    try {
      hashpassword = await bcrypt.hash(password, 10);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Error in hashing",
      });
    }

    let user = await User.create({
      name,
      email,
      password: hashpassword,
      role: role,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${name}`,
    });

    const paylod = {
      email: user.email,
      id: user._id,
      role: user.role,
    };

    let token = jwt.sign(paylod, process.env.JWT_SCERET, { expiresIn: "2h" });

    const options = {
      expires: new Date(Date.now() +  2* 60 * 60 * 1000),
      httpOnly: true,
    };
    
    user.token = token;
    user.password = undefined;

    res.cookie("token", token, options).status(200).json({
      success: true,
      token,
      user,
      message: "user created successfuly",
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "user not created try again",
    });
  }
};

exports.login = async (req, res) => {
  try {
    console.log(req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "fill entry correctully",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user not registered",
      });
    }

    const paylod = {
      email: user.email,
      id: user._id,
      role: user.role,
    };

    if (await bcrypt.compare(password, user.password)) {
      let token = jwt.sign(paylod, process.env.JWT_SCERET, { expiresIn: "2h" });

      //    user=user.toObject();

      user.token = token;
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 2*60*60*1000),
        httpOnly: true,
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        options,
        message: "user logged successfuly",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "encorect password",
      });
    }
  } catch (err) {
    console.error(err);
    console.log(err.message);

    return res.status(500).json({
      success: false,
      message: "login failed",
    });
  }
};
