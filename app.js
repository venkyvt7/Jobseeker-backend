const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const axios = require('axios')
const app = express();
const PORT = 3000;
var offers = require('./data.js');
var user = require('./control/routes/user');
var admin = require('./control/routes/admin');
const { off } = require('./model/db/dbuserregister.js');

mongoose.connect('mongodb://localhost/JobSeeker', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json());
app.use('/user', user);

app.use('/admin', admin);

app.get('/offers', async(req, res) => {

let dataa;
console.log(32232);
 axios.get('https://api.infojobs.net/api/7/offer', {
        headers
:{    "Authorization": "Basic M2UxNjRiOWUwZmM2NGYwY2FlM2JlMjEzODBiYTBmMWE6RE10enREdldrd3hCOG02UVlremVCbEJLZFhWTFNnK0Iyd0hSUU40L25xTk9qZ1RLdEY="
}

    }).then(res1=>res.json(res1.data)).catch();

    // const res2=await res1.json();

   
    // res.json(res2);
    // res.send("hello")
})


// mongoose.connect('m')
// mongoose.connect('mongodb://localhost:27017/server')

app.listen(PORT);