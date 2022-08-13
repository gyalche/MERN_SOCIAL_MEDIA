import express from 'express';
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import morgan from 'morgan';
import dotenv from 'dotenv';
import AuthRoute from './Routes/AuthRoute.js';
import UserRoute from './Routes/UserRoute.js';

//dotevn configuration;
dotenv.config();

const app = express();
app.use(cors())
app.use(morgan('dev'));

app.use(express.json());
app.use(bodyParser.json({limit:'30mb', extended:true}));
app.use(bodyParser.urlencoded({limit:'30mb', extended:true}));

mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
    .then((data) => {
    console.log(`mongodb is connected at ${data.connection.host}`)
    }).catch(err=>console.log(err))

const PORT=process.env.PORT || 9000;

//usage fo routes;
app.use('/auth', AuthRoute)
app.use('/user', UserRoute)


app.listen(PORT, ()=>{
    console.log(`server is listening to http://localhost:${PORT}`)
})