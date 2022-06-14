const Router = require('express')
const router = new Router()

const CartController = require('../controllers/cartController')

// ------- Добавил проверку на авторизацию для того, чтобы вытащить оттуда авторизованного юзера -------- //
const authMiddleware = require('../middleware/AuthMiddleware')

// ------- CRUD корзины ------- //
// router.get('/',  cartController.getCartUser)
// router.post('/',  cartController.addToCart)
// router.get('/', authMiddleware , cartController.getCartUser)
// router.post('/', authMiddleware , cartController.addToCart)
router
    .post('/', authMiddleware, CartController.addTrack)
    .get('/', authMiddleware, CartController.getTracks)
    .delete('/:id', authMiddleware, CartController.deleteTrack);
    //.delete('/:id', authMiddleware, checkDeleteTrackFromCart, CartController.deleteTrack);
    
module.exports = router;