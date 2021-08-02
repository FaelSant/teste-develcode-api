import { Router } from "express"
import { UserController } from "./controllers/UserController"
import upload from "./utils/multer"
const router = Router()

router.get("/users", UserController.list)
router.put("/users/:id", upload.single("image"), UserController.update)
router.delete("/users/:id", UserController.remove)
router.post("/users", upload.single("image"), UserController.create)

export { router }
