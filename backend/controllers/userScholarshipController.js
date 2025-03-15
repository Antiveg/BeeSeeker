const { UserScholarships, User, Scholarship, Provider, Organization, Location } = require('../models')
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
        const uid = (req.params.uid !== undefined) ? +req.params.uid : req.user.id
        const userScholarships = await UserScholarships.findAll({
            attributes: {
                exclude: ['createdAt','updatedAt']
            },
            include: [
                {
                    model: Scholarship,
                    attributes: ['title','deadline'],
                    include: [
                        {
                            model: Provider,
                            attributes: ['id'],
                            include: [
                                {
                                    model: Organization,
                                    attributes: ['logo','name']
                                }
                            ]
                        },
                        {
                            model: Location,
                            attributes: ['name']
                        }
                    ]
                },
            ],
            where: {
                userid: uid
            }
        })

        const userScholarshipsJSON = userScholarships.map((scholarship) => {
            const scholarshipJSON = scholarship.toJSON()
            scholarshipJSON.Scholarship.deadline = formatDate(scholarshipJSON.Scholarship.deadline)
            return scholarshipJSON
        })

        const currUser = await User.findOne({
            attributes: ['resume'],
            where: {
                id: uid
            }
        })

        res.status(200).json({
            message: "successfully fetch all scholarship applied by a user",
            userScholarships: userScholarshipsJSON,
            resume: currUser?.resume ? encodeURI(`http://localhost:5000/uploads/${currUser.resume}`) : null
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

const getUserScholarshipByProviderId = async (req, res, next) => {
    try {
        const pid = +req.params.pid
        const providerScholarships = await Scholarship.findAll({
            attributes: ['id','title'],
            include: [
                {
                    model: Location,
                    attributes: ['name']
                },
                {
                    model: UserScholarships,
                    attributes: ['isaccepted'],
                    include: [
                        {
                            model: User,
                            attributes: ['id','name', 'resume']
                        }
                    ]
                }
            ],
            where: {
                providerid: pid
            },
        })
        const resultJSON = providerScholarships.map(scholarship => {
            const plainScholarship = scholarship.toJSON();
            return {
                id: plainScholarship.id,
                title: plainScholarship.title,
                location: plainScholarship.Location?.name,
                users: plainScholarship.UserScholarships.map(userScholarship => ({
                    id: userScholarship.User?.id,
                    isaccepted: userScholarship.isaccepted,
                    name: userScholarship.User?.name || null,
                    resume: userScholarship.User?.resume ? encodeURI(`http://localhost:5000/uploads/${userScholarship.User?.resume}`) : null
                }))
            }
        })

        res.status(200).json({
            message: "successfully get all applicant scholarships details",
            scholarships: resultJSON
        })
    }catch(error){
        next(error)
    }
}

module.exports = { addUserScholarship, changeUserScholarshipStatus, getUserScholarshipByScholarshipId, getUserScholarshipByUserId, getUserScholarships, getUserScholarshipByProviderId }