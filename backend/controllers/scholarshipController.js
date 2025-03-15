const { Scholarship, Location, Major, Education, Provider, Organization, User, UserScholarships } = require('../models')
const path = require('path')
const fs = require('fs')
const formatDate  = require('./utility')

const getScholarshipById = async (req, res, next) => {
    try {
        const sid = +req.params.sid
        const userId = req.query.userId;
        const scholarshipSeq = await Scholarship.findOne({
            attributes: {
                exclude: ['updatedAt']
            },
            where: {
                id: sid
            },
            include: [
                {
                    model: Major,
                    attributes: ['name']
                },
                {
                    model: Location,
                    attributes: ['name']
                },
                {
                    model: Education,
                    attributes: ['name']
                },
                {
                    model: Provider,
                    attributes: {
                        exclude: ['userid','organizationid','createdAt','updatedAt']
                    },
                    include: [
                        {
                            model: Organization,
                            attributes: {
                                exclude: ['createdAt','updatedAt']
                            }
                        },
                        {
                            model: User,
                            attributes: {
                                exclude: ['createdAt','updatedAt','password']
                            }
                        }
                    ]
                },
            ],
        })

        let userScholarshipTemp = null
        if(!(userId === undefined || userId === null)){
            userScholarshipTemp = await UserScholarships.findOne({
                attributes: ['userid', 'scholarshipid'],
                where: {
                    scholarshipid: sid,
                    userid: +userId,
                }
            })
            
        }
        console.log(userId)
        console.log(userScholarshipTemp)
        const isApplied = (userScholarshipTemp !== null)

        const scholarship = scholarshipSeq.toJSON()
        scholarship.deadline = formatDate(scholarship.deadline)
        scholarship.createdAt = formatDate(scholarship.createdAt)

        res.status(200).json({
            message: "successfully fetch scholarship info",
            scholarship: scholarship,
            isapplied: isApplied,
            userScholarshipTemp: userScholarshipTemp
        })
    }catch(error){
        next(error)
    }
}

// const getScholarships = async (req, res, next) => {
//     try {
//         const scholarships = await Scholarship.findAll({
//             attributes: {
//                 exclude: ['updatedAt','createdAt']
//             },
//             include: [
//                 {
//                     model: Major,
//                     attributes: ['name']
//                 },
//                 {
//                     model: Location,
//                     attributes: ['name']
//                 },
//                 {
//                     model: Education,
//                     attributes: ['name']
//                 },
//                 {
//                     model: Provider,
//                     attributes: {
//                         exclude: ['userid','id','organizationid','createdAt','updatedAt']
//                     },
//                     include: [
//                         {
//                             model: Organization,
//                             attributes: {
//                                 exclude: ['createdAt','updatedAt']
//                             }
//                         },
//                         {
//                             model: User,
//                             attributes: {
//                                 exclude: ['createdAt','updatedAt','password']
//                             }
//                         }
//                     ]
//                 },
//             ],
//         })

//         scholarships.forEach((scholarship) => {
//             scholarship.deadline = formatDate(scholarship.deadline)
//         })
//         const JSONscholarships = scholarships.map(scholarship => scholarship.toJSON())
//         res.status(200).json({
//             message: "successfully fetch all scholarships info",
//             scholarships: JSONscholarships,
//         })
//     }catch(error){
//         next(error)
//     }
// }

const getScholarships = async (req, res, next) => {
    try {
        const scholarships = await Scholarship.findAll({
            attributes: {
                exclude: ['updatedAt']
            },
            include: [
                {
                    model: Major,
                    attributes: ['name']
                },
                {
                    model: Location,
                    attributes: ['name']
                },
                {
                    model: Education,
                    attributes: ['name']
                },
                {
                    model: Provider,
                    attributes: {
                        exclude: []
                    },
                    include: [
                        {
                            model: Organization,
                            attributes: {
                                exclude: ['createdAt', 'updatedAt']
                            }
                        },
                        {
                            model: User,
                            attributes: {
                                exclude: ['createdAt', 'updatedAt', 'password']
                            }
                        }
                    ]
                },
            ],
        })

        const JSONscholarships = scholarships.map(scholarship => {
            const plainScholarship = scholarship.toJSON()
            plainScholarship.deadline = formatDate(plainScholarship.deadline);
            plainScholarship.createdAt = formatDate(plainScholarship.createdAt);
            if(plainScholarship.Provider && plainScholarship.Provider.Organization){
                const logoUrl = plainScholarship.Provider.Organization.logo
                    ? `http://localhost:5000/uploads/${plainScholarship.Provider.Organization.logo}`
                    : null
                plainScholarship.Provider.Organization.logo = encodeURI(logoUrl)
            }
            return plainScholarship
        })

        res.status(200).json({
            message: "Successfully fetched all scholarships info",
            scholarships: JSONscholarships,
            // scholarships: scholarships
        })
    } catch (error) {
        next(error)
    }
}

const updateScholarship = async (req, res, next) => {
    try {
        const sid = +req.params.sid
        const isvisible = req.body.isvisible === "true" || req.body.isvisible === true
        const count = await Scholarship.update({
            isvisible: isvisible
        }, {
            where: {
                id: sid
            }
        })
        res.status(200).json({
            message: "successfully updated scholarship data"
        })
    }catch(error){
        next(error)
    }
}

// const getOwnScholarships = async (req, res, next) => {
//     try {
//         const { id } = req.user

//         console.log(req.user)

//         if(!id){
//             res.status(401).json({
//                 message: 'user are not authenticated'
//             })
//         }else{
//             const scholarships = await Scholarship.findAll({
//                 attributes: {
//                     exclude: ['password']
//                 },
//                 where: {
//                     userid: id
//                 }
//             })

//             scholarships.forEach((scholarship) => {
//                 scholarship.updatedAt = formatDate(scholarship.updatedAt)
//                 scholarship.createdAt = formatDate(scholarship.createdAt)
//                 scholarship.deadline = formatDate(scholarship.deadline)
//             })

//             res.status(200).json({
//                 message: "User authenticated!",
//                 scholarships: scholarships
//             })
//         }
//     }catch(error){
//         next(error)
//     }
// }

const createScholarship = async (req, res, next) => {
    try {
        const {  
            title, funding, education, 
            location, description, major
        } = req.body

        const provider = await Provider.findOne({ 
            attributes: ['id'],
            where: {
                userid: +req.user.id
            }
        });
        
        if (!provider) {
            return res.status(404).json({ message: "Provider not found" });
        }

        const scholarship = await Scholarship.create({  
            title, 
            funding: +funding, 
            educationid: +education, 
            locationid: +location, 
            majorid: +major,
            providerid: provider.id, 
            description, 
            deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        });

        res.status(201).json({
            message: "a new scholarship successfully created",
            newscholarship: scholarship
        })
    }catch(error){
        next(error)
    }
}

module.exports = { getScholarshipById, getScholarships, createScholarship, updateScholarship }