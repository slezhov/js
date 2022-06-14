import React, { useContext, useEffect, useState } from "react"
import { Context } from "../../index"
import "./Player.css"
import {
	PlayCircleOutline,
	SkipPrevious,
	SkipNext,
	PlaylistPlay,
	Shuffle,
	Repeat,
	VolumeDown,
	PlayCircleFilled,
	Favorite,
	MoreHoriz,
} from "@material-ui/icons"
import { Grid, Slider } from "@material-ui/core"
import Nav from "react-bootstrap/Nav"
import { NavLink, useParams } from "react-router-dom"
import {
	ADMIN_ROUTE,
	CART_ROUTE,
	LOGIN_ROUTE,
	MAIN_ROUTE,
	REGISTRATION_ROUTE,
	TRACK_ROUTE,
	UPLOAD_ROUTE,
} from "../../utils/consts"
import { Button, Form, FormControl, Navbar, NavDropdown } from "react-bootstrap"
import { observer } from "mobx-react"
import Container from "react-bootstrap/Container"
import { useNavigate } from "react-router-dom"
import { fetchOneTrack } from "../../http/trackAPI"
export const audio = new Audio()
console.log(typeof(audio))
export const playingTrack = new Object()
console.log(typeof(playingTrack))
const Player = observer(() => {
	// useEffect(() => {
	// 	fetchOneTrack(id).then((data) => setTrack(data))
	// }, [])
	
	 const { id } = useParams()
	const { user, cart } = useContext(Context)
	const [track, setTrack] = useState({ info: [] })
	console.log("id + track " +id+ " " +track)
	//const { user, cart, track } = useContext(Context)

	const play = () => {
		try {
			if (audio.paused) {
				audio.play()
				console.log(audio.src)
			} else {
				audio.pause()
			}
		} catch (e) {
			alert("ошибка при воспроизведении")
		}
	}
	const repeat = () => {
		try {
			if (audio.loop) {
				audio.loop = false
			} else {
				audio.loop = true
			}
		} catch (e) {
			alert("ошибка при воспроизведении")
		}
	}
	const next = () => {
		try {
			audio.pause()
			fetchOneTrack(2).then((data) => setTrack(data))
			//audio.play()
			console.log(audio.src)
		} catch (e) {
			alert("ошибка при воспроизведении")
		}
	}
	const prev = () => {
		try {
			if (audio.loop) {
				audio.loop = false
			} else {
				audio.loop = true
			}
		} catch (e) {
			alert("ошибка при воспроизведении")
		}
	}
	const shuffle = () => {
		try {
			if (audio.loop) {
				audio.loop = false
			} else {
				audio.loop = true
			}
		} catch (e) {
			alert("ошибка при воспроизведении")
		}
	}
	const volume = () => {
		try {
			if (audio.paused) {
				audio.play()
			} else {
				audio.pause()
			}
		} catch (e) {
			alert("ошибка при воспроизведении")
		}
	}

	return (
		<div
			bg="dark"
			variant="dark"
			expand="lg"
			style={{
				
				position: "fixed",
				bottom: 0,
				backgroundColor: "black",
				width: "100vw",
			}}
		>
			<div className="footer">
				<div className="footer__left">
					<div className="footer__songInfo">
						<h4>{playingTrack.name}</h4>
						<p>{playingTrack.userId}</p>
					</div>
				</div>
				<div className="footer__center">
					<Shuffle className="footer__green" onClick={() => shuffle()}/>
					<SkipPrevious className="footer__icon" onClick={() => prev()}/>
					<PlayCircleOutline
						fontSize="large"
						className="footer__icon"
						onClick={() => play()}
					/>
					<SkipNext className="footer__icon" onClick={() => next()}/>
					<Repeat className="footer__green" onClick={() => repeat()}/>
				</div>
				<div className="footer__right">
					<Grid container spacing={2}>
						<Grid item>
							<PlaylistPlay />
						</Grid>
						<Grid item>
							<VolumeDown />
						</Grid>
						<Grid item xs>
							<Slider />
						</Grid>
					</Grid>
				</div>
			</div>
		</div>
	)
})

export default Player
