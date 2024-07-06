const express = require('express');
const db = require('./app/models')
const photoRouter = require('./app/routes/photo.routes');
const captionRouter = require('./app/routes/caption.routes');
const authRouter = require('./app/routes/auth.routes')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const helmet = require('helmet')
const initial = require('./app/models/initial')

const app = express();

const corsOption = {
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 200
}
app.use(cors(corsOption))

app.use(helmet())
app.use(cookieParser());


const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const path = require('path')
const swaggerDefinition = {
    openapi: "3.0.3",
    info: {
        title: "Caption Canvas API",
        description: "The backend for Caption Canvas, a platform for users to participate in a photo caption contest.",
        termsOfService: "http://swagger.io/terms/",
        contact: {
            email: "abdihakim.muhumedo@gmail.com"
        },
        license: {
            name: "MIT",
            url: "https://spdx.org/licenses/MIT.html"
        },
        version: "1.0.1"
    },
    externalDocs: {
        description: "Find out more about Caption Canvas API here",
        url: "https://github.com/Abdihakim-Muhumed/Caption-Canvas-API",
        servers:{
            url: "http://localhost/3000",
            url: ""
        }
    }
}
const options = {
    swaggerDefinition,
    apis: [path.join(__dirname, './api-docs.yml')]
}
const swaggerSpec = swaggerJsDoc(options)

app.use('/docs',swaggerUi.serve, swaggerUi.setup(swaggerSpec));

db.sequelize.sync().then(() => {
    console.log("Sync DB");
    initial()
})
app.get('/', (req, res) => {
    res.redirect(301, '/docs')
});

app.use('/api/photos/', photoRouter);
app.use('/api/captions/',captionRouter);
app.use('/api/auth/', authRouter);


const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/`)
})