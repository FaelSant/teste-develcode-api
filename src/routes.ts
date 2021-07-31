import { Router } from "express"
import { UserController } from "./controllers/UserController"

const router = Router()

router.get("/users", UserController.list)
router.put("/users/:id", UserController.update)
router.delete("/users/:id", UserController.remove)
router.post("/users", UserController.create)

export { router }
