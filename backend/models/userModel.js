const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = mongoose.Schema({
    name: { type: String, required: true},
    lName: { type: String, required: true},
    email: { type: String, required: true , unique: true },
    password: { type: String, required: true},
    cPassword: { type: String, required: true},

    pic: { type: String, default: "https://www.shutterstock.com/image-vector/incognito-symbol-icon-anonymous-browsing-260nw-1988148782.jpg"},
},
{
    timestamps: true
})


userSchema.pre("save" , async function (next) {
    if(!this.isModified){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password , salt)
    this.cPassword = await bcrypt.hash(this.cPassword , salt)

})

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword , this.password)
}

userSchema.methods.matchcompPassword = async function(cPassword){
    return await bcrypt.compare(cPassword , this.cPassword)
}

const User = mongoose.model("User" , userSchema)

module.exports = User