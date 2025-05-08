const express = require("express");
const cors = require("cors");
const path = require("path");
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

if(process.env.ENVIRONMENT === "PRODUCTION"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});
}



app.listen(PORT,()=>{

    connectDB()
    
    console.log(`Sever is running on PORT ${PORT}`)

})