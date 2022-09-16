import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import AuthRoute from './Routes/AuthRoute.js';
import UserRoute from './Routes/UserRoute.js';
import PostRoute from './Routes/PostRoute.js';
import uploadRoute from './Routes/uploadRoute.js';
import chatRoute from './Routes/ChatRoute.js';
import messageRoute from './Routes/MessageRoute.js';
const app = express();
app.use(cors({ origin: true, credentials: true }));

//to serve images for public;
app.use(express.static('public'));
app.use('/images', express.static('images'));

dotenv.config();
app.use(morgan('dev'));

app.use(express.json());
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

// var corsOptions = {
//   origin: 'http://localhost:5000',
// };

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((data) => {
    console.log(`mongodb is connected at ${data.connection.host}`);
  })
  .catch((err) => console.log(err));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
const PORT = process.env.PORT || '5000';

//usage fo routes;
app.use('/auth', AuthRoute);
app.use('/user', UserRoute);
app.use('/post', PostRoute);
app.use('/upload', uploadRoute);
app.use('/chat', chatRoute);
app.use('/message', messageRoute);
app.listen(PORT, () => {
  console.log(`server is listening to http://localhost:${PORT}`);
});
