const { response } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../middlewares/jwt-generator");

const signup = async (req, res = response) => {
  try {
    const { email, password } = req.body;
    const usuario = new User({
      email,
      password,
    });

    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();
    console.log(usuario._id)
    
    const token = await generarJWT(usuario._id);
    res.status(200).json({
      email: usuario.email,
      localId: usuario.localId,
      idToken: token,
      expiresIn: usuario.expiresIn
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    const validPassword = bcryptjs.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        msg: `User or Password incorrect`,
      });
    }
    const token = await generarJWT(user._id);

    res.status(200).json({
      email: user.email,
      localId: user.localId,
      idToken: token,
      expiresIn: user.expiresIn,
    });
  } catch (error) {
    return res.status(400).json({
        'error':'El usuario no existe'
    })
  }
};

module.exports = {
  login,
  signup,
};
