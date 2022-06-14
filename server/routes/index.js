const Router = require("express")
const router = new Router()
const trackRouter = require("./trackRouter")
const userRouter = require("./userRouter")
//const performerRouter = require("./performerRouter")
const typeRouter = require("./typeRouter")
const cartRouter = require('./cartRouter')

router.use("/user", userRouter)
router.use("/type", typeRouter)
//router.use("/performer", performerRouter)
router.use("/track", trackRouter)
router.use('/cart', cartRouter)

module.exports = router
