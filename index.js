const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const dotenv = require('dotenv')
dotenv.config();

// 3 on use start (cors, express.json(), bodyParser.urlencoded)
app.use(cors())

// Get variable environment
const portServer = process.env.PORT_SERVER_RUNNING

// Connected on database ft mongodb
mongoose.connect(process.env.URL_MONGOOSE)
.then(() => console.log('Mongoose connected to DB'))
.catch((err) => console.error('Mongoose connection error:', err));

// Middleware untuk mengatur timeout
app.use((req, res, next) => {
    res.setTimeout(20000, () => {
        res.status(408).send('Request timeout');
    });
    next();
});

app.use(express.json({ limit: '250mb' }));
app.use(express.urlencoded({ limit: '250mb', extended: true }));

// Middleware
const checkToken = require('./middlewares/verifyToken')

// Routers
const accountRouter = require('./routers/accountRouter')

const poetryRouter = require('./routers/poetryRouter')
const emailRouter = require('./routers/emailRouter')
const bookRouter = require('./routers/bookRouter')

app.use('/account', accountRouter)
app.use('/poetry', checkToken, poetryRouter)
app.use('/book', checkToken, bookRouter)
app.use('/email', emailRouter)

app.get('/test', (req, res) => {
    res.send('test success!')   
})

// Running test
app.listen(portServer,() => {
    console.log(`Running on port ${portServer}`)
})