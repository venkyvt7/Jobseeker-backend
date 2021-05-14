const express= require('express');
const mongoose=require('mongoose');


const app=express();
const port =process.env.PORT||3000;

var user= require('./control/routes/user');
var admin= require('./control/routes/admin');
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use('/user', user);

app.use('/admin', admin);

app.get('/',(req,res)=>{
  

    res.send("hello")
})


// mongoose.connect('m')
mongoose.connect('mongodb://localhost:27017/server', {useNewUrlParser: true, useUnifiedTopology: true } )

app.listen(port);