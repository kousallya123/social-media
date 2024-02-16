
const router=require('express').Router()
const multer=require('multer')
const {addPost,getPost,likePost, addComment,getComment}=require('../controller/postController')

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, './public/images');
    },
    filename(req, file, callback) {
        callback(null,file.originalname);
    },
});

const upload = multer({ storage:storage});

router.post('/upload', upload.single('file'),addPost)

router.get('/',getPost)

router.put('/like/:id',likePost)

router.post('/addcomment/:id',addComment)

router.get('/getcomment/:id',getComment)

module.exports=router