const router = require('express').Router();
const User = require('../model/User');

router.post('/register', async (req,res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    try{
        const savedUSer = await user.save();
        res.send(savedUSer);
    }catch(err){
        res.status(400).send(err);
    }
});

module.exports = router;