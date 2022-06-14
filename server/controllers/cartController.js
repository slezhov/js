const {Cart, CartTrack, Track, TrackInfo} = require('./../models/models');
const jwt = require('jsonwebtoken');
const { Op } = require("sequelize");

class CartController {
    async addTrack(req, res) {
        try {
            const {id} = req.body;
            const token = req.headers.authorization.split(' ')[1];
            const user = jwt.verify(token, process.env.SECRET_KEY);
            const cart = await Cart.findOne({where: {userId: user.id}});
            await CartTrack.create({cartId : cart.id, trackId: id});
            return res.json("Product added in card");
        } catch (e) {
            console.error(e);
        }
    }

    async getTracks(req, res) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const user = jwt.verify(token, process.env.SECRET_KEY);
            console.log(user.id)
            const {id} = await Cart.findOne({where: {userId: user.id}});
            const cart = await CartTrack.findAll({where: {cartId: id}});

            const cartArr = [];
            for(let i = 0; i < cart.length; i++) {
                const cartTrack = await Track.findOne({
                        where: {
                            id: cart[i].trackId,

                        },
                        include: {
                            model: TrackInfo, as: "info",
                            where: {
                                trackId: cart[i].trackId,
                                [Op.or]: [
                                    {
                                        trackId: {
                                            [Op.not]: null
                                        }
                                    }
                                ],
                            },
                            required: false}
                        });
                cartArr.push(cartTrack);
            }

            return res.json(cartArr);
        } catch (e) {
            console.error(e);
        }
    }

    async deleteTrack(req, res) {
        try {
            const {id} = req.params;
            const user = req.user;

            await Cart.findOne({where: {userId: user.id}}).then(async userCart => {
                if(userCart.userId === user.id) {
                    await CartTrack.destroy({where: {cartId: userCart.id, trackId: id}})
                }
                return res.json(`You haven't access for delete the track(${id}) from Cart that didn't belong to you`);
            });
            return res.json("Product deleted form your card");
        } catch (e) {
            console.error(e);
        }
    }
}

module.exports = new CartController();
