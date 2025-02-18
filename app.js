require('dotenv').config()

//async errors
require('express-async-errors')

const express = require('express')
const app = express()

//Connect DB
const connectDB = require('./db/connect')
const productRouter = require('./routes/productRoutes')

const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

//middleware
app.use(express.json())

//routes

app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">Products Route</a>')
})

app.use('/api/v1/products',productRouter)

//products route

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


const PORT = process.env.PORT || 3000

const start = async () => {
    try {
        //connect db
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, console.log(`Server is running on port ${PORT}...`))
    } catch (error) {
        console.log(error);
    }
}

start()