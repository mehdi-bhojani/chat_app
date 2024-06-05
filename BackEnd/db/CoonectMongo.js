import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI;

async function connectToMongo() {
    try {
        // Connect to MongoDB using Mongoose
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Successfully connected to MongoDB");

        // Perform any additional operations here
        // For example, you might want to keep the connection open for your application's duration
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

connectToMongo().catch(console.dir);

export default connectToMongo;
