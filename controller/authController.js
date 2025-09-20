const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.getRegister = (req,res) => res.render('auth/register');
exports.postRegister = async (req,res) => {
  const { username, email, password, phone } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ username, email, phone, password: hashed });
  await user.save();
  req.session.userId = user._id;
  res.redirect('/');
};

exports.getLogin = (req,res) => res.render('auth/login');
exports.postLogin = async (req,res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.render('auth/login', { error: 'Email không tồn tại' });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.render('auth/login', { error: 'Mật khẩu không đúng' });
  req.session.userId = user._id;
  res.redirect('/');
};

exports.logout = (req,res) => {
  req.session.destroy(err => {
    res.clearCookie('sid');
    res.redirect('/auth/login');
  });
};
