const mongoose = require("mongoose");

mongoose.set('strictQuery', false);
exports.connectDb = async () => {
    try {
        const dbconnect = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongodb connected: ${dbconnect.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
}