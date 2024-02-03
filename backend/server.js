const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
const Postrouter = require('./routers/Post');
const Authrouter = require('./routers/Auth');
const Compostrouter =  require('./routers/Compost')


app.use('/api/post', Postrouter ); // Post routers  
app.use('/api/auth', Authrouter ); // Auth Routers
app.use('/api/comp' , Compostrouter );

// app.use('/api/auth', Authrouter); // Auth Routers
app.get("/api/get", (req, res)=>{
    console.log("first-server")
    res.json({message: "hello world!!"});
    
});




const PORT = process.env.PORT || 6969 ; 

const connection_url = process.env.CONNECTION_URL; 

mongoose.connect(connection_url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => {console.log(`server running on port ${PORT}`)}))
    .catch((err) => console.log(err.message))