import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const secret = process.env.MY_SECRET_KEY;

const authMiddleWare = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (token) {
      const decode = await jwt.verify(token, secret);
      req.body._id = decode?.id;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default authMiddleWare;
