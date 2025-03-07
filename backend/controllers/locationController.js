const { Location } = require('../models')

const getLocations = async (req, res, next) => {
    try {
        const locations = await Location.findAll({
            attributes: {
                exclude: ['updatedAt', 'createdAt']
            }
        })

        res.status(200).json({
            message: "successfully fetch all locations",
            locations: locations
        })
    }catch(error){
        next(error)
    }
}

module.exports = { getLocations }