const express = require('express')
require('dotenv').config()
require('express-async-errors')
const fileUpload = require('express-fileupload');
const morgan = require('morgan')
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');




const app = express()


const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});


app.use(express.json())
app.use(morgan('dev'));





const connectDB = require('./db/connect')
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const authMiddleware = require('./middleware/authentication')
const ensureAdmin = require('./middleware/authorization')
const authroute = require('./routes/auth')
const prroductRoute = require('./routes/product')
const orderRoute = require('./routes/order')
const userprofileRoute = require('./routes/user')
const adminRoute = require('./routes/admin')


app.use(fileUpload({ useTempFiles: true }));
app.use('/api/v1', authroute)
app.use('/api/v1/product', authMiddleware, prroductRoute)
app.use('/api/v1/order', authMiddleware, orderRoute)
app.use('/api/v1/profile', authMiddleware, userprofileRoute)
app.use('/api/v1/admin', authMiddleware, ensureAdmin,  adminRoute)



app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


// Security
app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());






const port = process.env.PORT || 3001;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
















