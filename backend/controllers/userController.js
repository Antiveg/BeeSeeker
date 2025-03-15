const { User } = require('../models')
const path = require('path')
const fs = require('fs')
const formatDate  = require('./utility')

const getUserById = async (req, res, next) => {
    try {
        const uid = +req.params.uid
        const user = await User.findOne({
            attributes: {
                exclude: ['updatedAt', 'password']
            },
            where: {
                id: uid
            },
        })
        user.createdAt = formatDate(user.createdAt)

        res.status(200).json({
            message: "successfully fetch user info",
            user: user
        })
    }catch(error){
        next(error)
    }
}

const getUsers = async (req, res, next) => {
    try {
        const users = await User.findAll({
            attributes: {
                exclude: ['password', 'updatedAt']
            }
        })
        users.forEach((user) => {
            user.createdAt = formatDate(user.createdAt)
        })

        res.status(200).json({
            message: "successfully fetch all users id & name",
            users: users
        })
    }catch(error){
        next(error)
    }
}

const updateUserResume = async (req, res, next) => {
    try {
        const id = +req.user.id
        const relativePath = req.file.path.replace(/^.*[\\\/]?uploads[\\\/]/, '')
        const [isUpdated, updatedUsers] = await User.update(
            {
                resume: relativePath,
            },
            {
                where: { id: id },
                returning: true
            }
        )

        if(!isUpdated) return res.status(200).json({ message: "no user resume got changed" })

        const updated = updatedUsers[0]
        res.status(200).json({
            message: "successfully update user resume",
            resume: updated?.resume ? encodeURI(`http://localhost:5000/uploads/${updated.resume}`) : null
        })
    }catch(error){
        next(error)
    }
}

const getAuthenticatedUser = async (req, res, next) => {
    try {
        const { id } = req.user

        console.log(req.user)

        if(!id){
            res.status(401).json({
                message: 'user are not authenticated'
            })
        }else{
            const authUser = await User.findOne({
                attributes: {
                    exclude: ['updatedAt','createdAt','password']
                },
                where: {
                    id: id
                }
            })

            res.status(200).json({
                message: "User authenticated!",
                user: authUser
            })
        }
    }catch(error){
        next(error)
    }
}

module.exports = { getUserById, getUsers, updateUserResume, getAuthenticatedUser }