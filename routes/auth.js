const router = require('express').Router();
const User = require('../model/User');
const {registerValidation, loginValidation} = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')



router.post('/register', async (req,res) => {
     const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // check if user already exists
    const emailExist = await User.findOne({email:req.body.email});
    if(emailExist) return res.status(400).send('Email already used!!')

    // passwd hash with bcrypt
    // const salt = await bcrypt.salt(10);
    const hashPassword  =await bcrypt.hash(req.body.password, 10);

    //new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });
    try{
        const savedUser = await user.save();
        res.send('registration successfull' + {user:user._id} );
    }catch(err){

        res.status(400).send(err);
    }
});

// login

router.post('/login', async (req,res) => {
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // check email exists
    const user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send('Email not found!!')

    // check for password is same
    const validpasswd = await bcrypt.compare(req.body.password, user.password);
    if(!validpasswd) return res.status(400).send('Invalid password')

    // create and assign jwt token
    const token = jwt.sign({_id:user.id}, process.env.SECRET_TOKEN);
    res.header('auth-token', token).send(token);
});

module.exports = router;