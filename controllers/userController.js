const bcrypt = require('bcrypt')
const base64 = require('base-64')
const Users = require('../models/users')

const singup = (req, res) => {
    res.render('signup', { message: null })
}

const loginPage = (req, res) => {
    res.render('login', { message: null })
}

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            // res.status(400).json({
            //     message: "User already exists ! please login!"
            // })
            return res.render('signup', { message: "User already exists ! please login!" })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = new Users({ name, email, password: hashPassword })
        newUser.save()
            .then(response => {
                // res.status(200).json({
                //     message: "User created successfully!"
                // })
                res.render('login', { message: "User created successfully!" })
            })
            .catch(err => {
                // res.status(500).json({
                //     message: "User cannot be created ! Please try again later!"
                // })
                res.render('signup', { message: "User cannot be created ! Please try again later!" })
            })
    }
    catch {
        // return res.status(500).json({
        //     message: "User cannot be created due to server issue! Please contact support!"
        // })
        return res.render('signup', { message: "User cannot be created due to server issue! Please contact support!" })
    }
}

const login=async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await Users.findOne({ email })
        if (!existingUser) {
            return res.render('login', { message: "User does not exists !please signup first! " })
        }
        const passwordMatch=await bcrypt.compare(password,existingUser.password)
        if(passwordMatch){
            req.session.userId=existingUser._id
            res.redirect('/')
        }
        else{
            res.render('login',{message:"Invalid Password"})
        }
    }
    catch {
        res.render('login', { message: "User cannot be created due to server issue! Please contact support!" })
    }
}

const allUsers=(req,res)=>{
    Users.find()
    .then(response=>{
        res.json(response)
    })
    .catch(error=>{
        res.json(error)
    })
}

const logout=(req,res)=>{
    req.session.destroy(()=>{
        return res.redirect('/login')
    })
}
module.exports = {
    singup,
    loginPage,
    register,
    login,
    allUsers,
    logout
}