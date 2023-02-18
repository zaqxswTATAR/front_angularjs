let express = require('express'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    database = require('./database'),
    bodyParser = require('body-parser')

// Connect MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(database.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database connected successfully');
}, err => {
    console.log('Cannot connect to database ' + err)
})

const sequenceAPI = require('../back_nodejs/routes/sequence.route');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(cors());

// API
app.use('/api', sequenceAPI);

// Create Port
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
})

// 404 handler
app.use((req, res, next) => {
    next(createError(404))
})

// Error handler
app.use(function(err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message)
})