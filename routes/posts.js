const router = require('express').Router();
const verify = require('../verifyToken') 



router.get('/',verify,(req,res) => {
    res.json({
        posts:{
            title: "myposts",
            des: "accesible only if logged in"
        }
    })
})

module.exports = router;