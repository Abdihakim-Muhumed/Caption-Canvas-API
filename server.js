const express = require('express');
const db = require('./app/models')
const photoRouter = require('./app/routes/photo.routes');
const captionRouter = require('./app/routes/caption.routes');
const authRouter = require('./app/routes/auth.routes')
const cookieParser = require('cookie-parser')
const cors = require('cors')


const app = express();

const corsOption = {
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 200
}

app.use(cors(corsOption))
app.use(cookieParser());


db.sequelize.sync().then(() => {
    console.log("Sync DB");
})

app.get('/', (req, res) => {
    res.send("Welcome to Caption Canvas API!")
});

app.use('/api/photos/', photoRouter);
app.use('/api/captions/',captionRouter);
app.use('/api/auth/', authRouter);


const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/`)
})