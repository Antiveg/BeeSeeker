const { Major } = require('../models')

const getMajors = async (req, res, next) => {
    try {
        const majors = await Major.findAll({
            attributes: {
                exclude: ['updatedAt', 'createdAt']
            }
        })

        res.status(200).json({
            message: "successfully fetch all majors",
            majors: majors
        })
    }catch(error){
        next(error)
    }
}

module.exports = { getMajors }