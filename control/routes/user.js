const express=require('express')
const User=require('../../model/db/dbuserregister.js')
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

router.post('/register', (req,res)=>{
  // desiredpostion
  //   const  {email,username,password,desiredposition}=req.body;
  //   console.log(email,username,password,desiredposition);
  //   try {
	// 	const user = await User.create({
  //           email:email,
	// 		username:username,
	// 		password:password,
  //     desiredposition:desiredposition
	// 	})


  //   const token=createToken(user._id);
	// 	console.log('User created successfully: ', user)
  //   res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000});
  //   res.status(201).json({user:user._id})
	// } catch (error) {
	// 	if (error.code === 11000) {
		
	// 		return res.json({ status: 'error', error: 'Email is already in use' })
	// 	}
	// 	else
  //   {
  //     res.send(error)
  //   }
	// }
  let body = req.body;
    let { username, email, password, desiredposition } = body;
    console.log(username)
  
    User.create({
      username,
      email,
      desiredposition,
      password
    })
    .then(user => {
      const token=createToken(user._id);
	    console.log('User created successfully: ', user)
      res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000});
      delete user.password;
      return res.status(200).json(user)
    })
    .catch(err => {
        return res.status(400).send('This user just exist');
    });

    
  //  res.send("eeee");
  
})


module.exports=router;

