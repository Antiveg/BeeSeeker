const { UserScholarships, User, Scholarship } = require('../models')
const formatDate = require('./utility')

const getUserScholarships = async (req, res, next) => {
    try {
        const userScholarships = UserScholarships.findAll({
            attributes: {
                exclude: ['updatedAt']
            },
            include: [
                {
                    model: User,
                    attributes: {
                        exclude: ['updatedAt','createdAt','password']
                    }
                },
                {
                    model: Scholarship,
                    attributes: {
                        exclude: ['createdAt','updatedAt']
                    }
                }
            ],
            raw: true
        })
        userScholarships.forEach((userScholarship) => {
            userScholarship.createdAt = formatDate(userScholarship.createdAt)
        })

        res.status(200).json({
            message: 'successfully fetch all user and scholarship associations',
            userScholarships: userScholarships
        })
    }catch(error){
        next(error)
    }
}

const getUserScholarshipByUserId = async (req, res, next) => {
    try {
        const uid = +req.params.uid
        const userScholarships = await UserScholarships.findAll({
            attributes: {
                exclude: ['createdAt','updatedAt']
            },
            where: {
                userid: uid
            }
        })
        res.status(200).json({
            message: "successfully fetch all scholarship applied by a user",
            userScholarships: userScholarships
        })
    }catch(error){
        next(error)
    }
}

const getUserScholarshipByScholarshipId = async (req, res, next) => {
    try {
        const sid = +req.params.sid
        const userScholarships = await UserScholarships.findAll({
            attributes: {
                exclude: ['createdAt','updatedAt']
            },
            where: {
                scholarshipid: sid
            }
        })
        res.status(200).json({
            message: "successfully fetch all users which applied a scholarship",
            userScholarships: userScholarships
        })
    }catch(error){
        next(error)
    }
}

const changeUserScholarshipStatus = async (req, res, next) => {
    try {
        const uid = +req.params.uid
        const sid = +req.params.sid
        const isaccepted = +req.body.isaccepted

        const [updatedCount, updatedResult] = await UserScholarships.update(
            {
                isaccepted: isaccepted,
            },
            {
                where: {
                    userid: uid,
                    scholarshipid: sid
                },
                returning: true
            },
        )

        if(!updatedCount){
            res.status(404).json({
                message: 'no updating occurred'
            })
        }else{
            res.status(200).json({
                message: 'successfully update user scholarship status',
                updated: updatedResult
            })
        }
    }catch(error){
        next(error)
    }
}

const addUserScholarship = async (req, res, next) => {
    try {
        const sid = +req.params.sid
        const uid = +req.user.id
        const newUserScholarship = await UserScholarships.create({
            userid: uid,
            scholarshipid: sid,
            isVisible: true,
            isAccepted: null,
            resume: null
        })

        res.status(201).json({
            message: "successfully add user as scholarship candidate",
            newUserScholarship: newUserScholarship
        })
    }catch(error){
        next(error)
    }
}

module.exports = { addUserScholarship, changeUserScholarshipStatus, getUserScholarshipByScholarshipId, getUserScholarshipByUserId, getUserScholarships }