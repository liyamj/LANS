const express = require("express")
const app = express();

/*
app.use("/athira",(req,res)=>{
  console.log("This is main url of athira")
})
*/
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");

dotenv.config();

app.use(express.json())

mongoose.connect(process.env.MONGO_URL,{
  
  useUnifiedTopology: true,
  
}).then(console.log("Connected to MongoDB")).catch((err)=>console.log(err));


const storage = multer.diskStorage({
  destination:(req,file,cb) =>{
    cb(null,"image")
  },filename:(req,file,cb)=>{
    cb(null,req.body.name)
  }
})

const upload = multer({storage:storage});
app.post("/api/upload", upload.single("file"),(req,res)=>{
  res.status(200).json("File has been uploaded..")
})

app.use("/api/auth" , authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute)

app.listen("8000", ()=>{
  console.log("backend is running")
})

