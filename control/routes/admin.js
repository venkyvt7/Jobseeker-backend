const express=require('express')
const User=require('../../model/db/dbadminregister.js')
const jwt=require('jsonwebtoken')
const router = express.Router();
const maxAge=3*24*60*60;

const createToken=(id)=>{

  return jwt.sign({id},'FULCRUMADMIN',{
    expiresIn:maxAge
  })

}



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

    else
    {

      if(user&&user.password==password)
      {
      const token=createToken(user._id);
      console.log('User created successfully: ', user)
      res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000});
      res.status(201).json({user:user._id})
      }

      else
      {
        res.status(400);
        res.send("invalid login")
      }
    }
})

router.post('/register',async  (req,res)=>{
  // desiredpostion
    const  {email,username,password,desiredpostion}=req.body;
    console.log(email,username,password,desiredpostion);
    try {
      const user1 = await User.findOne({ email });

     if(user1)
     {
       res.send("error")

     }

     else
     {

		const user = await User.create({
            email:email,
			username:username,
			password:password,
      desiredpostion:desiredpostion
		})


    const token=createToken(user._id);
		console.log('User created successfully: ', user)
    res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000});
    res.status(201).json({user:user._id})
  }
	} catch (error) {
		if (error.code === 11000) {
		
			return res.json({ status: 'error', error: 'Email is already in use' })
		}
		else
    {
      res.send("error")
    }
	}

    
  //  res.send("eeee");
  
})


module.exports=router;

