import multer from "multer"
import path from "path"

export default multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname)
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("O tipo de imagem não é aceito"))
      return
    }
    cb(null, true)
  }
})
