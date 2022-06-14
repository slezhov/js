import Admin from "./pages/Admin"
import Auth from "./pages/Auth"
import Cart from "./pages/Cart"
import TrackPage from "./pages/TrackPage"
import Main from "./pages/Main"
import {
	ADMIN_ROUTE,
	CART_ROUTE,
	TRACKPAGE_ROUTE,
	LOGIN_ROUTE,
	REGISTRATION_ROUTE,
	MAIN_ROUTE,
	TRACKS_ROUTE,
	UPLOAD_ROUTE,
	MESSAGER_ROUTE,
	PERFORMER_ROUTE,
	PROFILE_ROUTE,
} from "./utils/consts"
import Track from "./pages/Track"
import Upload from "./pages/Upload"
import Messager from "./pages/Messager"
import Profile from "./pages/Profile"
import Performer from "./pages/Performer"

export const authRoutes = [
	{
		path: ADMIN_ROUTE,
		element: <Admin />,
	},
	
]
export const publicRoutes = [
	{
		path: CART_ROUTE,
		element: <Cart />,
	},
	{
		path: MAIN_ROUTE,
		element: <Main />,
	},
	{
		path: LOGIN_ROUTE,
		element: <Auth />,
	},
	{
		path: REGISTRATION_ROUTE,
		element: <Auth />,
	},
	{
		path: TRACKPAGE_ROUTE + "/:id",
		element: <TrackPage />,
	},
	{
		path: TRACKS_ROUTE,
		element: <Track />,
	},
	{
		path: UPLOAD_ROUTE,
		element: <Upload />,
	},
	{
		path: PROFILE_ROUTE,
		element: <Profile />,
	},
	{
		path: MESSAGER_ROUTE,
		element: <Messager />,
	},
	{
		path: PERFORMER_ROUTE,
		element: <Performer />,
	},
	{
		path: PROFILE_ROUTE,
		element: <Profile />,
	},
]
