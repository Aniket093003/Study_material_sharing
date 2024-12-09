import multer from "multer";


const storage = multer.diskStorage({
    designation: function (req, file, cb){
        cb(null, "../public/temp")
    }
})
