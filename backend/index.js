import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoute from './routes/auth.js'
import productRoute from './routes/product.js'
import userRoute from './routes/user.js'
import connectDB from './models/db.js';
import cartRoute from './routes/cart.js';
import helmet from 'helmet';
const app = express();


connectDB();

app.use(cors());
app.use(helmet());
app.use(express.json({limit:'10mb'}));
app.use(cookieParser());
dotenv.config();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('Hello World!');
})


app.use('/api/auth',authRoute)
app.use('/api/products',productRoute)
app.use('/api/user',userRoute)
app.use('/api/cart',cartRoute)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})