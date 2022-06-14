import React, { useContext, useState } from "react"
import { Container, Form } from "react-bootstrap"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { LOGIN_ROUTE, REGISTRATION_ROUTE, MAIN_ROUTE } from "../utils/consts"
import { login, registration } from "../http/userAPI"
import { observer } from "mobx-react"
import { Context } from "../index"

const Auth = observer(() => {
	const { user } = useContext(Context)
	const location = useLocation()
	const navigate = useNavigate()
	const isLogin = location.pathname === LOGIN_ROUTE
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	// const [name, setName] = useState("")

	const click = async () => {
		try {
			let data
			if (isLogin) {
				data = await login(email, password)
			} else {
				data = await registration( email, password)
				// data = await registration(name, email, password)
			}
			user.setUser(data)
			user.setIsAuth(true)
			navigate(MAIN_ROUTE)
		} catch (e) {
			alert("ошибка Auth")
		}
	}

	return (
		<Container
			className="d-flex justify-content-center align-items-center"
			style={{ height: window.innerHeight - 54 }}
		>
			<Card style={{ width: 600 }} className="p-5">
				<h2 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"}</h2>
				<Form className="d-flex flex-column">
					{/* {isLogin ? (
						""
					) : (
						<Form.Control
							className="mt-3"
							placeholder="Введите ваш nickname..."
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					)} */}
					<Form.Control
						className="mt-3"
						placeholder="Введите ваш email..."
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Form.Control
						className="mt-3"
						placeholder="Введите ваш пароль..."
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						type="password"
					/>
					<Row className="d-flex justify-content-between mt-3 pl-5 pr-5">
						{isLogin ? (
							<div>
								У вас нет аккаунта?{" "}
								<NavLink to={REGISTRATION_ROUTE}>
									Завести учётную запись
								</NavLink>
							</div>
						) : (
							<div>
								Уже сть аккаунт? <NavLink to={LOGIN_ROUTE}>Войти</NavLink>
							</div>
						)}
						<Button variant={"outline-success"} onClick={click}>
							{isLogin ? "Войти" : "Регистрация"}
						</Button>
					</Row>
				</Form>
			</Card>
		</Container>
	)
})

export default Auth
