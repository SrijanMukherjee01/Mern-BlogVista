const path=require('path');
const express=require('express');
const cors=require('cors');
const { default: mongoose } = require('mongoose');
const fs=require('fs');
const User =require('./models/user');
const Post=require('./models/Post');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser')
const app=express();

const jwt=require('jsonwebtoken');
const salt = bcrypt.genSaltSync(10);
const secret=process.env.JWT_SECRET;
const multer=require('multer');
const upload = multer({ dest: 'uploads/' }) // Specify the destination directory for uploaded files
require("dotenv").config();
 __dirname=path.resolve();
const BASE_URL = process.env.BASE_URL;

app.use(cors({ credentials: true, origin: `${BASE_URL}` }));
app.use(express.json()); //middlewares
app.use(cookieParser()) //middlewares for cookie parser
app.use('/uploads',express.static(__dirname +'/uploads'));

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

// mongoose.connect('mongodb+srv://msrijan513:Y5BmqkV5KsDFlL0w@cluster0.yq7ulqi.mongodb.net')

// Connect to MongoDB using the MONGO_URL environment variable
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });




app.post('/register',async(req,res)=>{
    const {username,password}=req.body;
    try {
        const userDoc=await User.create({
            username,
            password:bcrypt.hashSync(password, salt)});
        res.json({user:userDoc, message:'registration Successful'});
        
    }catch(error){
        res.status(500).json({message:'Internal Server Error!'})
        
    }
});

app.post('/login',async(req,res)=>{
    const{username,password}=req.body;
    const userDoc=await User.findOne({username});
    // res.json(UserDoc);
    const passok=bcrypt.compareSync(password, userDoc.password);
    // res.json(passok);
    if(passok){
        //logged in
        jwt.sign({username,id:userDoc._id},secret,{},(err,token)=>{
            if(err) throw err;
            res.cookie('token',token).json({
                id:userDoc._id,
                username,
            });
        });
    }
    else{
        res.status(400).json({message:'Wrong Credentials'});
    }
});

  // app.get("/profile", (req, res) => {
  //   const { token } = req.cookies;
  //   try {
  //     jwt.verify(token, secret, {}, (err, info) => {
  //       if (err) throw err;
  //       res.json(info);
  //     });
  //   } catch (error) {
  //     console.log("PROFILE FETCH ERROR", error.message);
  //   }
  // });

  app.get("/profile", (req, res) => {
    const { token } = req.cookies;
    try {
      jwt.verify(token, secret, {}, (err, info) => {
        if (err) {
          console.error("JWT verification error:", err.message);
          return res.status(401).json({ error: "Unauthorized" });
        }
        res.json(info);
      });
    } catch (error) {
      console.error("Error fetching profile:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
});


  app.post('/logout',(req,res)=>{
    res.cookie('token'," ").json('ok');
  });

  app.post("/post", upload.single("file"), async (req, res) => {
    //file was the name of our data label in formData inside createPost.jsx
    //to grab the image file from the request to CREATE a post we'll need a library called multer
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
      if (err) throw err;
      const { title, summary, content,author,cover } = req.body;
      const postDoc = await Post.create({
        title,
        summary,
        content,
        cover:newPath,
        author:info.id
      });
      res.json(postDoc);
    });
  });

  app.get('/post',async(req,res)=>{
     const posts=await Post.find()
     .populate('author',['username'])
     .sort({createdAt:-1})
     .limit(25)
    res.json(posts);
  })

  app.get('/post/:id',async(req,res)=>{
    const {id}=req.params;
    const postDoc=await Post.findById(id).populate('author',['username']);
    res.json(postDoc)
  })

  app.put("/post", upload.single("file"), async (req, res) => {
    let newPath = null;
    if (req.file) {
        const { originalname, path } = req.file;
        const parts = originalname.split(".");
        const ext = parts[parts.length - 1];
        newPath = path + "." + ext;
        fs.renameSync(path, newPath);
    }

    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;

        const { id, title, summary, content } = req.body;
        const postDoc = await Post.findById(id);

        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
        if (!isAuthor) {
            return res.status(400).json("You are not the author");
        }

        // Create an object with updated fields
        const updatedFields = {
            title,
            summary,
            content,
            cover: newPath ? newPath : postDoc.cover,
        };

        // Update the post document and return the updated document
        const updatedPost = await Post.findByIdAndUpdate(id, updatedFields, { new: true });

        res.json(updatedPost);
    });
});

// Serve index.html file for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
});

const port=process.env.PORT || 8000;
app.listen(port,()=>{
    console.log(`Server Listening to http://localhost:${port}`);
})

//mongo password
//Y5BmqkV5KsDFlL0w
// mongodb+srv://msrijan513:Y5BmqkV5KsDFlL0w@cluster0.yq7ulqi.mongodb.net/
