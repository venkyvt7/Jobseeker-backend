const express= require('express');
const mongoose=require('mongoose');
const cors=require('cors')

const app=express();
const PORT = 3000;
var offers=require('./data.js');
var user= require('./control/routes/user');
var admin= require('./control/routes/admin');
const { off } = require('./model/db/dbuserregister.js');

mongoose.connect('mongodb://localhost/JobSeeker', {useNewUrlParser: true, useUnifiedTopology: true } );

app.use(cors());
app.use(express.json());
app.use('/user', user);

app.use('/admin', admin);

app.get('/offers',(req,res)=>{
  
 console.log(offers);
 res.send(offers);
    // res.send("hello")
})


// mongoose.connect('m')
// mongoose.connect('mongodb://localhost:27017/server')

app.listen(PORT);