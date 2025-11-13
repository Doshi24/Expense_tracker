import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config({
    path: './.env'
}
)

const connectdb = async () => {
    try {
        mongoose.connect(process.env.MONGOURL)
        console.log("Database connected successfully")
    } catch (error) {
        console.log("DB connection error "+error);
    }
}
export {connectdb}