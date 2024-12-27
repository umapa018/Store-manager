import usermodel from "../models/usermodel.js";
import validator from "validator";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

// Route user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await usermodel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User does not exists" })
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = createToken(user._id)
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: 'Invalid creditials' })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


// Route for user Register
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //checking user already exist or not
        const exist = await usermodel.findOne({ email });
        if (exist) {
            return res.json({ success: false, message: "User already exists" })
        }
        // validating email for strong pass
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter Valid email" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter Strong Password" })
        }

        //hashing user pass to db
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new usermodel({
            name,
            email,
            password: hashedPassword
        })
        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({ success: true, token })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//Route for Admin login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token=jwt.sign(email+password,process.env.JWT_SECRET);
            res.json({success:true,token})
        }else{
            res.json({success:false,message:"Invalid Creditials"})
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}

export { loginUser, registerUser, adminLogin }