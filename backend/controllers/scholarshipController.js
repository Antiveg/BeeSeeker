const { Scholarship, Location, Major, Education, Provider, Organization, User } = require('../models')
const path = require('path')
const fs = require('fs')
const formatDate  = require('./utility')

const getScholarshipById = async (req, res, next) => {
    try {
        const sid = +req.params.sid
        const scholarship = await Scholarship.findOne({
            attributes: {
                exclude: ['updatedAt', 'createdAt']
            },
            where: {
                id: sid
            },
            include: [
                {
                    model: Major,
                    attributes: ['id','name']
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
            raw: true
        })

        scholarship.deadline = formatDate(scholarship.deadline)

        res.status(200).json({
            message: "successfully fetch scholarship info",
            scholarship: scholarship
        })
    }catch(error){
        next(error)
    }
}

const getScholarships = async (req, res, next) => {
    try {
        const scholarships = await Scholarship.findAll({
            attributes: {
                exclude: ['updatedAt']
            },
            raw: true
        })
        scholarships.forEach((scholarship) => {
            scholarship.createdAt = formatDate(scholarship.createdAt)
            scholarship.deadline = formatDate(scholarship.deadline)
        })
        res.status(200).json({
            message: "successfully fetch all scholarships info",
            scholarships: scholarships
        })
    }catch(error){
        next(error)
    }
}

const createScholarship = async (req, res, next) => {
    try {
        const {  
            title, funding, categoryid, educationid, 
            locationid, providerid, description, 
            eligibilitycriteria = 'None', benefit = 'None', 
            addoninfo = 'None', deadline 
        } = req.body
        const scholarship = await Scholarship.create({  
            title, funding, categoryid, educationid, 
            locationid, providerid, description, 
            eligibilitycriteria, benefit, 
            addoninfo, deadline 
        })

        res.status(201).json({
            message: "a new scholarship successfully created",
            newscholarship: scholarship
        })
    }catch(error){
        next(error)
    }
}

module.exports = { getScholarshipById, getScholarships, createScholarship }