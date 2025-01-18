const express = require("express");
require("dotenv").config()
const router = require('./routes/routes')
const cors = require("cors")

const app = express();

app.use(cors({
    origin: '*'     
}));
app.use(express.json());
app.use('/', router)


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});