/* Function to connect database to server */

import mongoose from "mongoose";

const connectDB = async() => {
    const dbUri = process.env.dbURI || '';
    console.log("[server]: Connecting to DB...")
    try{
        await mongoose.connect(dbUri);
    } catch(error){
        console.log("[server]: could not connect to DB");
        console.log(error);
        process.exit(1);
    }
}

export default connectDB;