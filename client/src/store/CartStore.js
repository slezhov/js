import {makeAutoObservable} from "mobx";
import {deleteTrackFromCart} from "../http/trackAPI";

export default class CartStore {
    constructor() {
        this._totalPrice = 0;
        this._cart = [];
        makeAutoObservable(this);
    }

    async setDeleteItemCart(track, isAuth = false) {
        if(isAuth) {
            await deleteTrackFromCart(track.id).then(() => {
                this._cart = this._cart.filter(item => item.id !== track.id);
                this._totalPrice -=  track.price * track.count;
            });
        } else {
            this._cart = this._cart.filter(item => item.id !== track.id);
            this._totalPrice -=  track.price * track.count;

            localStorage.setItem("cart", JSON.stringify(this._cart));
        }
    }

    setCart(item, isAuth = false) {
        const checkTrackInCart = this._cart.findIndex(track => track.id === item.id);
        if(checkTrackInCart < 0) {
            this._cart = [...this._cart, { count: 1, ...item}];
            let totalPrice = 0;
            this._cart.forEach(track => totalPrice += Number(track.price * track.count));
            this._totalPrice = totalPrice;
        }

        if(!isAuth) {
            localStorage.setItem("cart", JSON.stringify(this._cart));
        }
    }

    setDeleteAllTrackFromCart() {
        this._totalPrice = 0;
        return this._cart = [];
    }

    setCountTrack(trackId, action, isAuth = false) {
        const itemId = this._cart.findIndex(item => item.id === trackId);
        const itemInState = this._cart.find(track => track.id === trackId);
        if (action === "+") {
            const newItem = {
                ...itemInState,
                count: ++itemInState.count
            }
            this._cart = [...this._cart.slice(0, itemId), newItem, ...this._cart.slice(itemId + 1)]
        } else {
            const newItem = {
                ...itemInState,
                count: itemInState.count === 1 ? 1 : --itemInState.count
            }
            this._cart = [...this._cart.slice(0, itemId), newItem, ...this._cart.slice(itemId + 1)]
        }

        if(!isAuth) {
            localStorage.setItem("cart", JSON.stringify(this._cart));
        }

        let totalPrice = 0;
        this._cart.forEach(track => totalPrice += Number(track.price * track.count));
        this._totalPrice = totalPrice;
    }

    resetCart() {
        this._cart = [];
        this._totalPrice = 0;
        localStorage.removeItem('cart');
    }


    get Cart() {
        return this._cart;
    }

    get Price() {
        return this._totalPrice;
    }
}
