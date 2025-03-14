const multer = require('multer')
const path = require('path')
const fs = require('fs')

const uploadFolder = path.join(__dirname, '..', 'uploads', 'organizationlogos')
if(!fs.existsSync(uploadFolder)){
    fs.mkdirSync(uploadFolder, { recursive: true })
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadFolder)
    },
    filename: (req, file, cb) => {
        const uniqueName = `${req.body.organization_name} Logo${path.extname(file.originalname)}`
        cb(null, uniqueName)
    },
})
const upload = multer({ storage }).single('organization_logo')

const uploadOrganizationLogo = (req, res, next) => {
    if (req.body.role === 'User') {
        return next();
    }

    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json({ error: 'File upload failed' });
        }
        next();
    });
}

module.exports = uploadOrganizationLogo;