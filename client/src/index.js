import React, { createContext } from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import UserStore from "./store/UserStore"
import TrackStore from "./store/TrackStore"
import CartStore from "./store/CartStore"

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById("root"))
//console.log(process.env.REACT_APP_API_URL)
root.render(
	//<React.StrictMode>
		<Context.Provider
			value={{
				user: new UserStore(),
				track: new TrackStore(),
				cart: new CartStore(),
			}}
		>
			<App />
		</Context.Provider>
	//</React.StrictMode>
)
