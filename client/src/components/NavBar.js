import React, { useContext } from "react"
import { Context } from "../index"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import { NavLink } from "react-router-dom"
import {
	ADMIN_ROUTE,
	CART_ROUTE,
	LOGIN_ROUTE,
	MAIN_ROUTE,
	PROFILE_ROUTE,
	REGISTRATION_ROUTE,
	TRACK_ROUTE,
	UPLOAD_ROUTE,
} from "../utils/consts"
import { Button, Form, FormControl, NavDropdown } from "react-bootstrap"
import { observer } from "mobx-react"
import Container from "react-bootstrap/Container"
import { useNavigate } from "react-router-dom"

const NavBar = observer(() => {
	const { user, cart } = useContext(Context)
	const navigate = useNavigate()

	const logOut = () => {
		user.setUser({})
		user.setIsAuth(false)
		localStorage.removeItem("token")
		cart.resetCart();
	}
	return (
		<Navbar bg="dark" variant="dark" expand="lg" >
			<Container fluid>
				<Nav className="ml-0px" style={{ maxHeight: "100px" }}>
					<Navbar.Brand href={MAIN_ROUTE}>BeatSide</Navbar.Brand>
					<Form className="d-flex">
						<FormControl
							type="search"
							placeholder="Search"
							className="me-2"
							aria-label="Search"
						/>
						<Button variant="outline-success">Search</Button>
					</Form>
					<NavDropdown title="Link" id="navbarScrollingDropdown">
						<NavDropdown.Item onClick={() => navigate(PROFILE_ROUTE)} >Profile</NavDropdown.Item>
						<NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item href="#action5">
							Something else here
						</NavDropdown.Item>
					</NavDropdown>
					<Nav.Link href={UPLOAD_ROUTE}>Загрузить трек</Nav.Link>
				</Nav>
				{user.isAuth ? (
					<Nav className="ml-auto">
						<Button className="mr-2" onClick={() => navigate(CART_ROUTE)}>
							Корзина
						</Button>
						<Button
							className={"mr-3"}
							variant={"outline-light"}
							onClick={() => {
							navigate(ADMIN_ROUTE)
							}}
						>
							Админ панель
						</Button>
						<Button onClick={() => logOut()}>Выйти</Button>
					</Nav>
				) : (
					<Nav className="ml-auto">
						<Nav.Link href={LOGIN_ROUTE}>Sign in</Nav.Link>
						<Nav.Link href={REGISTRATION_ROUTE}>Sign up</Nav.Link>
					</Nav>
				)}
			</Container>
		</Navbar>
	)
})

export default NavBar
