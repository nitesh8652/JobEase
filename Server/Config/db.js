import mongoose, { mongo } from "mongoose"; 

/**
 * @function connectDB
 * @desc Establishes connection with MongoDB using Mongoose.
 *       Also listens for successful connection events.
 * 
 * @important
 * - Uses MONGODB_URI from environment variables
 * - Should be called when server starts
 * 
 */

const connectDB = async()=>{
    mongoose.connection.on('connected',()=>console.log("MongoDB connected"))

    await mongoose.connect(`${process.env.MONGODB_URI}`)
}


export default connectDB    