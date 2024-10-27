
const  User = require("../models/user_model.js")
const bcrypt =require( "bcryptjs")
const jwt=require(  "jsonwebtoken")


// user register
const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body
       

        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({ msg: "All fields are required" })
        }
        const userEmail = await User.findOne({ email })
        if (userEmail) {
            return res.status(400).json({ msg: "User already exist with this email" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        let user = await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role
        })
        return res.status(201).json({ msg: "user created successfully", user })

    }
    catch (e) {
        console.log(e)
        return res.status(500).json({ msg: "Internal Server Error" })

    }
}

// user login
 const login = async (req, res) => {
    try {

        const { email, password, role } = req.body
        if (!email || !password || !role) {
            return res.status(400).json({ msg: "All fields are required" })
        }
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ msg: "Incorrect email or password " })

        }

        const isPassword = await bcrypt.compare(password, user.password)
        if (!isPassword) {
            return res.status(400).json({ msg: "Incorrect email or password " })
        }

        // check role is valid or not

        if (role != user.role) {
            return res.status(400).json({ msg: "roles are different" })
        }

        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: "1d" })

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: "strict" }).json({ msg: "wellcome back", user })

    }
    catch (e) {
        return res.status(500).json({ msg: "Internal Server Error" })

    }
}

// user logout

const logOut = async (req, res) => {

    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({ msg: "Log Out Successfully" })

    }
    catch (e) {
        return res.status(500).json({ msg: "Internal Server Error" })
    }

}

// user update
const updateUser = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body

        const file = req.file


        // this is not req bcz ,person can upadte only detaial also
        // if (!fullname || !email || !phoneNumber || !bio || !skills) {
        //     return res.status(400).json({ msg: "All fields are required" })
        // }

        // cloudnery for file

        // skills is in string to convert in array
        let skillsArray
        if(skills){
        skillsArray = skills.split(",")
        }
        const userId = req._id
        let user = await User.findById(userId)
        if (!user) {
            return res.status(400).json({ msg: "user not find" })

        }


        // upadte data
        if(fullname) user.fullname = fullname
        if(email)   user.email = email
        if(phoneNumber)   user.phoneNumber = phoneNumber
        if(bio)   user.profile.bio = bio
        if(skills)  user.profile.skills = skillsArray

        await user.save()

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            profile: user.profile,

        }





        return res.status(201).json({ msg: "user updated successfully", user })

    }
    catch (e) {
        console.log(e)
        return res.status(500).json({ msg: "Internal Server Error" })

    }
}

module.exports={register,logOut,login,updateUser}
