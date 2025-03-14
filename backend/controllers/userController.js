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

const updateUserById = async (req, res, next) => {
    try {
        const {
            id, name, age, gender,
            profileimg
        } = req.body
        const [isUpdated, updatedUser] = await User.update(
            {
                name, age, gender, profileimg
            },
            {
                where: { id },
                returning: true
            }
        )

        if(!isUpdated){
            res.status(200).json({
                message: "no user got changed",
            })
        }else{
            res.status(200).json({
                message: "successfully update user",
                user: updatedUser
            })
        }
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

module.exports = { getUserById, getUsers, updateUserById, getAuthenticatedUser }