import { Router } from "express"
import { UserController } from "./controllers/UserController"
import upload from "./utils/multer"
const router = Router()

router.get("/users", UserController.list)
router.put("/users/:id", upload.single("photo_url"), UserController.update)
router.delete("/users/:id", UserController.remove)
router.post("/users", upload.single("photo_url"), UserController.create)

export { router }
