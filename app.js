const express = require('express');
const path = require('path');
const cors = require('cors');
const config = require('config');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

require('./middlewares/passport')(passport);

app.use(cors());

app.use('/api/auth', require('./routes/auth'));

app.use((req, res, next) => {
    res.status(404).redirect('http://localhost:5000/api/auth');
    next();
});

app.disable('x-powered-by');

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = config.get('PORT') || 5000;

(async function () {
    try {
        await mongoose.connect(config.get('mongoURI'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
            autoIndex: false,
            poolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            family: 4
        });

        app.listen(PORT, () => console.log(`Server has been started on port ${PORT}.`));
    } catch (e) {
        console.log('MongoDb connected error.', e.message);
        process.exit(1);
    }
})();

