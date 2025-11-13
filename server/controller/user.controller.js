import { User } from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const registeruser = async (req, res) => {
    try {
        const {email , password, username ,fullname } = req.body
        
        const existeduser = await User.findOne({email})
        if(existeduser){
            return res.status(400).json({status : "unsuccess", message : `User already exist with email ${existeduser.email}` , data : null })
        }

        const existedusername = await User.findOne({username})
        if(existedusername){
            return res.status(400).json({status : "unsuccess", message : `Username already taken ${existedusername.username}` , data : null })
        }

        console.log("passowrd with out hash", password)
        const hashedpass = await bcrypt.hash(password, 10)
        console.log("hashed password", hashedpass)

        const newuser = await User.create({
            email,
            password : hashedpass,
            username,
            fullname
        })

        return res.status(201).json({status : "success", message : `User registered successfully with Email ${newuser.email}` , data : newuser })

    } catch (error) {
        return res.status(500).json({status : "unsuccess", message : error.message , data : null })
    }
}


const loginuser = async (req, res) => {
    try {
        const {username , password} = req.body

        const finduser = await User.findOne({username})
        if(!finduser){
            return res.status(400).json({status : "unsuccess", message : "User does not exist with username" + username , data : null })
        }

        const passmatch = await bcrypt.compare(password , finduser.password)
        if(!passmatch){
            return res.status(400).json({status : "unsuccess", message : "Password is incorrect" , data : null })
        }

        const sendjwt = jwt.sign(
            {
                userid : finduser._id,
                username : finduser.username,
                email : finduser.email
             }, process.env.JWT_SECRET,{expiresIn : '1h'}

        )

        return res.status(200).json({status : "success", message : "User logged in successfully" , data : {user : finduser, token : sendjwt} })
    } catch (error) {
     return res.status(500).json({status : "unsuccess", message : error.message , data : null })   
    }
}


export { registeruser, loginuser }