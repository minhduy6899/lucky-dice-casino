// Import express library 
const express = require("express");
const path = require("path")
const env = require("dotenv");

// Import mongooseJS
const mongoose = require("mongoose");

// Import router
const diceHistoryRouter = require("./app/routes/diceHistoryRouter");
const userRouter = require("./app/routes/userRouter");
const prizeRouter = require("./app/routes/prizeRouter");
const voucherRouter = require("./app/routes/voucherRouter");
const prizeHistoryRouter = require("./app/routes/prizeHistoryRouter");
const voucherHistoryRouter = require("./app/routes/voucherHistoryRouter");

// Import model
const userModle = require('./app/models/userModel')
const diceHistoryModel = require('./app/models/diceHistoryModel')
const prizeModel = require('./app/models/prizeModel')
const voucherModel = require('./app/models/voucherModel')
const prizeHistoryModel = require('./app/models/prizeHistoryModel')
const voucherHistoryModel = require('./app/models/voucherHistoryModel')

// Khởi tạo app express
const app = express();

// Define middleware read json
app.use(express.json());

// Define middleware read data UTF-8
app.use(express.urlencoded({
    extended: true
}))

// Define static file
app.use(express.static(path.join(__dirname, "/views")))

env.config();

// Define port
const port = 8000;

// Connect to mongoDB
// mongoose.connect("mongodb://localhost:27017/CRUS_LuckyDice", (err) => {
//     if (err) {
//         throw err;
//     }
//     console.log("Connect MongoDB successfully!");
// })

mongoose
    .connect(
        `mongodb+srv://minhduy:123@lucky-dice-casino.wd5cmgn.mongodb.net/?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
    .then(() => {
        console.log("Database connected");
    });

// Console.log current time when send a request
app.use((request, response, next) => {
    console.log("Time", new Date());
    next();
})

// Console.log current method when send a request
app.use((request, response, next) => {
    console.log("Request method: ", request.method);
    next();
})

// Render file luckyDice.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/luckyDice.html'))
})

// Use router middleware
app.use("/", diceHistoryRouter);
app.use("/", userRouter);
app.use("/", prizeRouter);
app.use("/", voucherRouter);
app.use("/", prizeHistoryRouter);
app.use("/", voucherHistoryRouter);

// Run app express
app.listen(port, () => {
    console.log("App listening on port (Ứng dụng đang chạy trên cổng) " + port);
})