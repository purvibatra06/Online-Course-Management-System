import jwt from 'jwt-simple';
import dotenv from 'dotenv';
import Admin from '../../dblayer/Models/adminModel.js';
import Instructor from '../../dblayer/Models/instructorModel.js';
import User from '../../dblayer/Models/userModel.js';
dotenv.config();
const secret = process.env.SECRET;

const authenticate = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  try {
    const decoded = jwt.decode(token, secret);
    if (decoded.exp < Date.now() / 1000) {
      return res.status(401).json({ message: 'Token expired' });
    }
    const { id, role } = decoded;
    let user;
    if (role === 'admin') {
      user = await Admin.findById(id);
    } else if (role === 'instructor') {
      user = await Instructor.findById(id);
    } else {
      user = await User.findById(id);
    }
    if (!user) {
      return res.status(401).json({ message: `${role} not found` });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token', error: err.message });
  }
};

export default authenticate;