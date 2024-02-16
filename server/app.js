require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const path=require('path')


app.use(cors())
app.use(express.json())
app.use('/images',express.static(path.join(__dirname,'public/images')))
app.use('/', require('./routes/user'))
app.use('/post', require('./routes/post'))


const URI = process.env.MONGODB_URL;

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message);
    });

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`server is runing on port`, port);
})