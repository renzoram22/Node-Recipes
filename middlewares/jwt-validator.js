const jwt = require("jsonwebtoken");
const { response } = require("express");


const validarJWT =  (req,res = response) => {
    const { auth } = req.query;
    let decoded = jwt.decode(auth, process.env.SECRETKEY, true);
    console.log(decoded);
    const {uid} = decoded;
    return uid;
};

module.exports = {
  validarJWT,
};
