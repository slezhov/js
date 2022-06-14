const Router = require("express")
const trackController = require("../controllers/trackController")
const router = new Router()

// router.post("/", trackController.create)
// router.get("/", trackController.getAll)
// router.get("/:id", trackController.getOne)
.post('/', trackController.create)
.get('/', trackController.getAll)
.get('/:id', trackController.getOne)
.delete('/:id',  trackController.delete)
        //.get('/search', trackController.getSearchAllTrackByName)
         //.put('/:id',  trackController.update)
// .delete('/:id', checkRole("ADMIN"), trackController.delete)
// .put('/:id', checkRole("ADMIN"), trackController.update)

module.exports = router
