import { observer } from "mobx-react"
import React, { useContext } from "react"
import { Route, Routes } from "react-router-dom"
import { Context } from "../index"
import Main from "../pages/Main"
import { authRoutes, publicRoutes } from "../routes"
const AppRouter = observer(() => {
	const { user } = useContext(Context)
	//console.log(user)
	return (
		<Routes >
			
			{user.isAuth &&
				authRoutes.map(({ path, element }) => (
					<Route key={path} path={path} element={element} />
				))}
			{publicRoutes.map(({ path, element }) => (
				<Route key={path} path={path} element={element} />
			))}
			<Route path={"*"} element={<Main />} />
		</Routes>
	)
})

export default AppRouter
