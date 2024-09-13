import mongoose from "mongoose";

async function connectDB () {
    try {
        await mongoose.connect(process.env.MONGODB_URI,);
        console.log("MongoDB connected successfully");
        const connection = mongoose.connection
        connection.on('connected',()=>{
           console.log("Connected to MongoDB")
        }),
        connection.on('error',(err)=>{
            console.log("Error connecting to db",err)
        })
    } catch (error) {
        console.log("Error connecting",error)
    }
}

export {connectDB}