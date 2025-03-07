const { Provider } = require('../models')

const getProviders = async (req, res, next) => {
    try {
        const providers = await Provider.findAll({
            attributes: {
                exclude: ['updatedAt', 'createdAt']
            },
            include: [
                {
                    model: Organization,
                    attributes: {
                        exclude: ['updatedAt','createdAt']
                    }
                },
                {
                    model: User,
                    attributes: {
                        exclude: ['updatedAt','createdAt','password']
                    }
                }
            ]
        })

        res.status(200).json({
            message: "successfully fetch all providers",
            providers: providers
        })
    }catch(error){
        next(error)
    }
}

module.exports = { getProviders }