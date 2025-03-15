const multer = require('multer')
const path = require('path')
const fs = require('fs')

const uploadFolder = path.join(__dirname, '..', 'uploads', 'userresumes')
if(!fs.existsSync(uploadFolder)){
    fs.mkdirSync(uploadFolder, { recursive: true })
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadFolder)
    },
    filename: (req, file, cb) => {
        const { id, name } = req.user
        const filename = `${id}-${name}-resume${path.extname(file.originalname)}`
        cb(null, filename)
    }
})

const fileFilter = (req, file, cb) => {
    const allowedTypes = /pdf/
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = file.mimetype === "application/pdf"

    if (extname && mimetype) {
        return cb(null, true)
    } else {
        cb(new Error("Only PDF files are allowed"), false)
    }
}

const uploadUserResume = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
}).single('resume')

module.exports = uploadUserResume