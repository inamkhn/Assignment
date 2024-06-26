import express from 'express'
import {createUser,login,logout} from '../Controller/userController.js'
import { isAuthenticated } from '../middleware/auth.js'

const router = express.Router()


router.route('/create').post(createUser)
router.route('/login').post(isAuthenticated,login)
router.route('/logout').get(logout)
// router.route('/profile/:id').get(getMyProfile) //isAuthenticated,
// router.route('/allusers').get(getUsers)
// router.route('/deleteuser/:id').delete(deleteUser)
// router.route('/updateuser/:id').put(updateUser)

export default router