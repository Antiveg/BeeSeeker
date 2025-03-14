const { Organization } = require('../models')

const getOrganizations = async (req, res, next) => {
    try {
        const organizations = await Organization.findAll({
            attributes: {
                exclude: ['updatedAt', 'createdAt']
            }
        });

        const updatedOrganizations = organizations.map((organization) => ({
            ...organization.toJSON(),
            logo: organization.logo ? encodeURI(`http://localhost:5000/uploads/${organization.logo}`) : null
        }));

        res.status(200).json({
            message: "Successfully fetched all organizations",
            organizations: updatedOrganizations
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { getOrganizations }