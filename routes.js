const express = require('express')
const router = express.Router()
const { singup, login, register, loginPage, allUsers, logout } = require('./controllers/usercontroller')
const { requireAuth } = require('./utils/auth')
const { home, myBlogs, addBlog, createBlog, deleteBlog, editBlog, updateBlog } = require('./controllers/blogsController')


router.get('/signup', singup)

router.get('/login', loginPage)

router.post('/register', register)

router.post('/login', login)

router.get('/allusers', requireAuth, allUsers)

router.get('/logout', logout)

router.get('/', home)

router.get('/home', home)

router.get('/myblogs', myBlogs)

router.get('/addblog', addBlog)

router.get('/editblog', editBlog)

router.post('/createblog', createBlog)

router.post('/updateblog', updateBlog)


router.get('/deleteblog', deleteBlog)




module.exports = router