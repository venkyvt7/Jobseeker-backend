const express=require('express')
const User=require('../../model/db/dbuserregister.js')

const router = express.Router();


router.get('/login',async (req,res)=>{

    let { email, password } = req.body;
   
    const user = await User.findOne({ email });
   
    if (!user || user.password !== password) {
      res.status(403);
      res.json({
        message: "Invalid login",
      });
      return;
    }
    res.json({
      message: "success",
    });

})

router.post('/register',async  (req,res)=>{

    const  {email,username,password}=req.body;
    console.log(email,username,password);
    try {
		const response = await User.create({
            email:email,
			username:username,
			password:password
		})
		console.log('User created successfully: ', response)
	} catch (error) {
		if (error.code === 11000) {
		
			return res.json({ status: 'error', error: 'Email is already in use' })
		}
		throw error
	}

    
   res.send("eeee");
  
})


module.exports=router;