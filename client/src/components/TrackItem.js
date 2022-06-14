import React from "react"
import { Button, Card, Col } from "react-bootstrap"
import Image from "react-bootstrap/Image"
import star from "../assets/star.png"
import { useNavigate } from "react-router-dom"
import { TRACKPAGE_ROUTE, TRACKS_ROUTE } from "../utils/consts"
import { audio, playingTrack } from "./Player/Player"



	

const TrackItem = ({ track }) => {
	console.log("tr " + track.id)
	//playingTrack = track
	audio.src = process.env.REACT_APP_API_URL + playingTrack.tag
	const navigate = useNavigate()
	const play = () => {
		//Event.preventDefault()
		try {
			
			if (audio.paused && audio.src === process.env.REACT_APP_API_URL + track.tag) {
				audio.play()
			} else if(audio.src === process.env.REACT_APP_API_URL + track.tag) {
				audio.pause()
			} else {
				audio.src = process.env.REACT_APP_API_URL + track.tag
				audio.play()
			}
		} catch (e) {
			alert("ошибка при воспроизведении")
		}
	}
	return (
		<Col
			md={3}
			className="mt-3"
			
		>
			<Card
				className="p-2"
				style={{ width: 150}}
				border={"Light"}
			>
				<Image
					style={{ width: "100%", cursor: "pointer"  }}
					src={process.env.REACT_APP_API_URL + track.img}
					onClick={() => navigate(TRACKPAGE_ROUTE + "/" + track.id)}
				/>
				<div className="d-flex justify-content-between align-items-center mt-2">
					<div onClick={() => navigate(TRACKPAGE_ROUTE + "/" + track.id)} className="text-black-50">{track.name}</div>
					<Button onClick={() => play()}>Play</Button>
					<div className="d-flex align-items-center">
						<div>{track.rating}</div>
						<Image
							className="ml-1"
							src={star}
							style={{ width: "20px", height: "20px" }}
						/>
					</div>
				</div>
				<div onClick={() => navigate(TRACKPAGE_ROUTE + "/" + track.id)}>{track.price}</div>
			</Card>
		</Col>
	)
}

export default TrackItem
