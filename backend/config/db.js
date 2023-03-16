const mongoose = require("mongoose")
mongoose.set('strictQuery', false);

const connectDB = async() =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI , {
            useNewUrlparser: true
        })
        console.log(`DB connected successfuly`);
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB