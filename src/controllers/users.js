const User = require('../models/user');

async function addUser(req, res) {
  const { username, password } = req.body;
  
  const existingUser = await User.findOne({username}).exec();
  if (existingUser) {
    // { "error": "User already exist" }
    return res.status(409).json('User already exist');
    //status, sendStatus
    //status 只设置返回的status code，sendStatus是设置并返回（后面加json（））
    //send和json有关联
  }
  const user = new User({ username, password });
  await user.save();
  return res.sendStatus(201);
}

module.exports = { addUser };