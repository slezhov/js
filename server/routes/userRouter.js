const Router = require("express")
const userController = require("../controllers/userController")
const AuthMiddleware = require("../middleware/AuthMiddleware")
const router = new Router()

router.post("/registration", userController.registration)
router.post("/login", userController.login)
router.get("/auth", AuthMiddleware, userController.check)


module.exports = router
