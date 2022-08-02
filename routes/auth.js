const router = require('express').Router()
const User = require('../models/User')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')

// Register User

router.post('/register', async ( req , res )=>{

const newUser = new User({
    username: req.body.username.toLowerCase(),
    email: req.body.email.toLowerCase(),
    password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
})
try { 
    const createdUser = await newUser.save()
    res.status(201).json(createdUser)

} catch (err) {
    res.status(500).json(err)
}
});

router.post('/login', async ( req , res )=>{
    try { 
    const users = await User.findOne({
        username: req.body.username.toLowerCase()
    })

    //console.log(users)

    !users && res.status(401).json('Wrong username......')

    const OriginalPassword = CryptoJS.AES.decrypt(users.password, process.env.PASS_SEC).toString(CryptoJS.enc.Utf8)

    OriginalPassword !== req.body.password && res.status(401).json('Wrong Password and username combination')
        const { password , ...others } = users._doc
        const accessToken = jwt.sign({
            id: users._id,
            isAdmin: users.isAdmin,
            isMerchant: users.isMerchant,
            isCustomer: users.isCustomer,
            isVendor: users.isVendor
        },
        process.env.JWT_SEC,
        {expiresIn: "1H"},
        )
        res.status(200).json({ ...others, accessToken })        
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router