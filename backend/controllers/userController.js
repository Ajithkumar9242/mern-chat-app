const asyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken");
const User = require("../models/userModel")
const bcrypt = require("bcrypt")


const registerUser = asyncHandler(async(req,res) =>{

    const { name, lName, email , password, cPassword, pic} = req.body;

    if(!name || !lName || !email || !password || !cPassword){
        res.status(400)
        throw new Error("PLEASE ENTER ALL DETAILS")
    }
    if(password !== cPassword){
        res.status(400)
        throw new Error("PASSWORDS DONT MATCH")
    }


    const userExists = await User.findOne({ email })
    if(userExists){
        res.status(400)
        throw new Error("USER EXISTS")
    }

    const user = await User.create({
        name,
        lName,
        email,
        password,
        cPassword,
        pic
    })
    

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            lName: user.lName,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error("FAILED TO CREATE USER")
    }
})

const authUser = asyncHandler( async (req,res) =>{
    const { name , password } = req.body
    const user = await User.findOne({ name })

    if(user && await user.matchPassword(password)){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id)
        })
        
    }
        else{
        res.status(401)
        throw new Error("INVALID EMAIL OR PASSWORD")
    }

})


const allUsers = asyncHandler(async (req,res) =>{
    const keyword = req.query.search?{
        $or: [
            { name: { $regex: req.query.search, $options: "i"}},
            { email: { $regex: req.query.search, $options: "i"}}
        ]
    } : {}

    const users = await User.find(keyword).find({_id: {$ne: req.user._id}})
    res.send(users)
})



module.exports = { registerUser, authUser, allUsers }