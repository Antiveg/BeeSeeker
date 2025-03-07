const { Education } = require('../models')

const getEducations = async (req, res, next) => {
    try {
        const educations = await Education.findAll({
            attributes: {
                exclude: ['updatedAt', 'createdAt']
            }
        })

        res.status(200).json({
            message: "successfully fetch all educations",
            educations: educations
        })
    }catch(error){
        next(error)
    }
}

module.exports = { getEducations }