const express = require('express');
const router = express.Router();

const authenticate = require('../middlewares/authenticate')
const errorHandler = require('../middlewares/errorHandling')

const { login /**/, register /**/, logout /**/} = require('../controllers/authController')
const { getEducations } = require('../controllers/educationController') //
const { getLocations } = require('../controllers/locationController') //
const { getMajors } = require('../controllers/majorController') //
const { getProviders } = require('../controllers/providerController') //
const { getOrganizations } = require('../controllers/organizationController') //
const { getScholarships /**/ , getScholarshipById /**/, createScholarship, getOwnScholarships } = require('../controllers/scholarshipController')
const { getUserById /**/, getUsers /**/, updateUserById, getAuthenticatedUser /**/} = require('../controllers/userController')
const { addUserScholarship, changeUserScholarshipStatus, getUserScholarshipByScholarshipId, getUserScholarshipByUserId, getUserScholarships } = require('../controllers/userScholarshipController')

const uploadOrganizationLogo = require('../middlewares/multerOrganizationLogo')
const uploadUserResume = require('../middlewares/multerUserResume')

router.post('/auth/login', login)
router.post('/auth/register', uploadOrganizationLogo, register)
router.post('/auth/logout', logout)

router.get('/scholarships', getScholarships)
router.get('/scholarship/detail/:sid', getScholarshipById)
router.get('/majors', getMajors)
router.get('/organizations', getOrganizations)
router.get('/providers', getProviders)
router.get('/locations', getLocations)
router.get('/educations', getEducations)

router.use(authenticate)

router.get('/scholarships/users', getUserScholarships)
router.get('/scholarship/user/:uid?', getUserScholarshipByUserId)
router.post('/create/scholarship', createScholarship)

router.get('/users', getUsers)
router.get('/user', getAuthenticatedUser)
router.get('/user/detail/:uid', getUserById)
router.put('/user/update/:uid', updateUserById)
router.put('/user/:uid/scholarship/:sid', changeUserScholarshipStatus)
router.post('/create/user/scholarship/:sid', addUserScholarship)
router.get('/user/scholarship/:sid', getUserScholarshipByScholarshipId)

router.use(errorHandler)

module.exports = router;