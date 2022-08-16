import UserModel from '../Models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//Registration of users;
export const registerUser = async (req, res) => {
  // const { username, password, firstname, lastname } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPassword;
  const newUser = new UserModel(req.body);

  const { username } = req.body;

  try {
    const oldUser = await UserModel.findOne({ username });
    if (oldUser) {
      return res.status(400).json('username already exist');
    }
    const user = await newUser.save();
    const token = jwt.sign(
      { username: user.username, id: user._id },
      process.env.MY_SECRET_KEY,
      {
        expiresIn: '1h',
      }
    );
    res.status(200).json({ user, token: token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//login user;

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username: username });
    if (user) {
      const validity = await bcrypt.compare(password, user.password);
      if (!validity) {
        res.status(400).json('wrong password');
      } else {
        const token = jwt.sign(
          { username: user.username, id: user._id },
          process.env.MY_SECRET_KEY,
          { expiresIn: '1h' }
        );
        res.status(200).json({ user, token: token });
      }
      // validity
      //   ? res.status(200).json(user)
      //   : res.status(404).json('wrong password');
    } else {
      res.status(404).json('user not found');
    }
  } catch (error) {
    res.status((500).json({ message: error.message }));
  }
};
