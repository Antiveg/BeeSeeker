const { Organization } = require('../models')

const getOrganizations = async (req, res, next) => {
    try {
        const organizations = await Organization.findAll({
            attributes: {
                exclude: ['updatedAt', 'createdAt']
            }
        })

        res.status(200).json({
            message: "successfully fetch all organizations",
            organizations: organizations
        })
    }catch(error){
        next(error)
    }
}

module.exports = { getOrganizations }