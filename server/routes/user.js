const { ctrlRegister, ctrlLogin } = require('../controller/userController')
const multer=require('multer')
const router=require('express').Router()


const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, './public/images');
    },
    filename(req, file, callback) {
        callback(null,file.originalname);
    },
});

const upload = multer({ storage:storage});

router.post('/register', upload.single('file'),ctrlRegister)

router.post('/login',ctrlLogin)

module.exports=router