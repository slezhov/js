import React, {useContext} from 'react';
import {observer} from "mobx-react";


import {Context} from "../index";
import {Button, Col, Image, Row} from "react-bootstrap";
import OneItemInCart from "../components/oneItemInCart";

import emptyCart from "./../assets/emptyCart.jpg";
import {ORDERING_ROUTE} from "../utils/consts";
import {NavLink} from "react-router-dom";

const CartCard = observer(() => {
    const {cart} = useContext(Context);

    if(cart.Cart.length === 0) {
        return (
            <div className="d-flex flex-column align-items-center mt-5">
                <div className="text-center mt-5" style={{fontSize: 28}}><b>Пустая корзина</b></div>
            </div>
        )
    }

    return (
        <>
            <br/>
            <NavLink to={ORDERING_ROUTE}>
                <Button>Перейти к оплате</Button>
            </NavLink>
            <Row className="mt-3">
                <Col xs={12}>
                    {cart.Cart.map(device => <OneItemInCart key={device.id} device={device}/>)}
                </Col>
            </Row>
        </>
    );
});

export default CartCard;
