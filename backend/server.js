const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const connectDB = require("./utils/dbConnect")
const userAuthRoute = require('./routes/userAuth.route')
const tasksRoute = require("./routes/tasks.route")

const app = express();
const PORT = process.env.PORT
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({urlencoded:true}));

app.use('/api',userAuthRoute)
app.use('/api',tasksRoute)

app.listen(PORT,()=>{

    connectDB()
    
    console.log(`Sever is running on PORT ${PORT}`)

})