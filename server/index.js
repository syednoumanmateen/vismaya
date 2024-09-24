const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()
const router = express.Router()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use("/api", router)
require("./routes/api")(router)
require("./routes/operation")(router)
require("./routes/plan")(router)
require("./routes/version")(router)


app.listen(8000, () => {
    mongoose.connect("mongodb+srv://syednoumanmateen1997:2vIsC4KGDZi5eWvm@cluster0.autnmuh.mongodb.net/vismaya?retryWrites=true&w=majority", {
    }).then(() => {
        console.log('Database connection successful');
    }).catch((err) => {
        console.error('Database connection error:', err);
    });
    console.log("Server started", 8000)
})