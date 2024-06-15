const express = require('express');
const db = require('./app/models')
const photoRouter = require('./app/routes/photo.routes');
const app = express();




db.sequelize.sync().then(() => {
    console.log("Sync DB");
})

app.get('/', (req, res) => {
    res.send("Welcome to Caption Canvas API!")
});

app.use('/api/photos/', photoRouter);

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/`)
})