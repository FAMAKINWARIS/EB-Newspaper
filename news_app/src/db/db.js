import { set, connect } from "mongoose";

// connect to database
set('strictQuery', false);
const connectDB = async () => {
  try {
    await connect('mongodb://127.0.0.1:27017/messagedb');
    console.log('connected to EB DATABASE');
  } catch (error) {
    console.log(error);
  }
};

// export connectDB
export default connectDB;
