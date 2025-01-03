import multer from "multer";
import dotenv from "dotenv";
dotenv.config();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/temp')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

 const upload = multer({
    storage,
});

export default upload;