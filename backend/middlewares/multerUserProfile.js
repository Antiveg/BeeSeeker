const multer = require('multer')
const path = require('path')
const fs = require('fs')

const uploadFolder = path.join(__dirname, '..', 'uploads', 'userprofiles')
if(!fs.existsSync(uploadFolder)){
    fs.mkdirSync(uploadFolder, { recursive: true })
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadFolder)
    },
    filename: (req, file, cb) => {
        const filename = `${Date.now()}-${file.originalname}`
        cb(null, filename)
    },
})
const uploadUserProfile = multer({ storage }).single('photo')

module.exports = uploadUserProfile;