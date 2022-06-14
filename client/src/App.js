import { observer } from "mobx-react"
import React, { useContext, useEffect, useState } from "react"
import { Container, Spinner } from "react-bootstrap"
import { BrowserRouter } from "react-router-dom"
import { Context } from "."
import "./App.css"
import AppRouter from "./components/AppRouter"
import NavBar from "./components/NavBar"
import Player from "./components/Player/Player"
import { getTrackFromCart } from "./http/trackAPI"
import { check } from "./http/userAPI"
import {
	RecoilRoot,
	atom,
	selector,
	useRecoilState,
	useRecoilValue,
} from "recoil"

// function App() {
// 	const { user } = useContext(Context)
// 	const [loading, setLoading] = useState(true)

// 	useEffect(() => {
// 		check()
// 			.then((data) => {
// 				user.setUser(data)
// 				user.setIsAuth(true)
// 			})
// 			.finally(() => setLoading(false))
// 	}, [])

// 	if (loading) {
// 		return <Spinner animation={"grow"} />
// 	}
// 	return (
// 		<BrowserRouter>
// 			<NavBar />
// 			<AppRouter />
// 		</BrowserRouter>
// 	)
// }

// export default App

const App = observer(() => {
	const { user, cart } = useContext(Context)
	const [loading, setLoading] = useState(false)

	//check authorization
	useEffect(() => {
		if (localStorage.getItem("token")) {
			setLoading(true)
			check()
				.then((data) => {
					user.setUser(data)
					user.setIsAuth(true)
				})
				.finally(() => {
					setLoading(false)
				})
		}
	}, [user])

	//Loading Cart
	useEffect(() => {
		if (user.isAuth === false) {
			cart.setDeleteAllTrackFromCart()
			const savedCart = JSON.parse(localStorage.getItem("cart"))
			for (let key in savedCart) {
				cart.setCart(savedCart[key])
			}
		} else if (user.isAuth === true) {
			cart.setDeleteAllTrackFromCart()
			getTrackFromCart().then((data) => {
				for (let key in data) {
					cart.setCart(data[key], true)
				}
			})
		}
	}, [cart, user.isAuth])

	if (loading) {
		return <Spinner animation="grow" />
	}

	return (
		//console.log(localStorage.getItem("token")),
		<RecoilRoot>
			<BrowserRouter>
				<NavBar />
				<Container  style={{ marginBottom: 100 }}>
					<AppRouter />
				</Container>
				<Player />
			</BrowserRouter>
		</RecoilRoot>
	)
})
export default App
