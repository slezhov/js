import React, { useContext, useEffect, useState } from "react"
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap"
import bigStar from "../assets/bigStar.png"
import { useParams } from "react-router-dom"
import { addToCart, addTrackToCart, fetchOneTrack } from "../http/trackAPI"
import { Context } from ".."
import PlayerStore from "../store/PlayerStore"
import Player from "../Player"
import audioo from "../assets/c4380d74-639f-4af1-97d2-9482155d7147tag.mp3"
import { audio } from "../components/Player/Player"

const TrackPage = () => {
	
	useEffect(() => {
		fetchOneTrack(id).then((data) => setTrack(data))
	}, [])
	const { id } = useParams()
	const { user, cart } = useContext(Context)
	const [track, setTrack] = useState({ info: [] })

	
	//const [resRate, setResRate] = useState("");
	//const [isAccessRating, setIsAccessRating] = useState(false);

	// useEffect( () => {
	//     fetchOneTrack(id).then(data => setTrack(data));
	//     if(user.isAuth) {
	//         checkRating({trackId: id}).then(res => setIsAccessRating(res.allow));
	//     }
	// },[id, resRate]);

	// const add = () => {
	//     const formData = new FormData()
	//     formData.append('trackId', id)
	//     addToCart(formData).then(response => alert(`Товар ` + track.name + ` был добавлен в вашу корзину!`))
	// }

	const isTrackInCart = () => {
		const findTrack = cart.Cart.findIndex(
			(item) => Number(item.id) === Number(track.id)
		)
		return findTrack < 0
	}
	const addTrackInCart = (track) => {
		if (user.isAuth) {
			addTrackToCart(track).then(() => cart.setCart(track, true))
		} else {
			cart.setCart(track)
		}
	}
	
	audio.src = process.env.REACT_APP_API_URL + track.tag
	console.log(track.id + " -- id " + track.tag)

	const play = () => {
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
		<Container className="mt-3">
			<Row>
				<Col md={4}>
					<Image width={300} src={process.env.REACT_APP_API_URL + track.img} />
				</Col>
				<Col md={4}>
					<Row className="d-flex flex-column align-items-center">
						<h2>{track.name}</h2>
						<div
							className="d-flex align-items-center justify-content-center"
							style={{
								background: `url(${bigStar}) no-repeat`,
								backgroundSize: "cover",
								width: 80,
								height: 80,
								fontSize: 28,
							}}
						>
							{/* {track?.rating || 0} */}
						</div>
						<Button onClick={() => play()} text="asd" > {audio.paused ? "Play" : "Pause"}</Button>
						{/* <Player/> */}
						{/* <RatingStars
                        ratingChanged={ratingChanged}
                        ratingVal={track?.rating || 0}
                        isAuth={user.isAuth}
                        isAccessRating={isAccessRating}
                    />
                    {resRate} */}
					</Row>
				</Col>
				<Col md={4}>
					<Card
						className="d-flex flex-column align-items-center justify-content-around"
						style={{
							width: 300,
							height: 300,
							fontSize: 32,
							border: "5px solid lightgray",
						}}
					>
						<h3>{track?.price || 0} RUB</h3>
						{isTrackInCart() ? (
							<Button
								variant="outline-dark"
								onClick={() => addTrackInCart(track)}
							>
								Добавить в корзину
							</Button>
						) : (
							<Button variant="outline-dark" disabled>
								трек уже в корзине
							</Button>
						)}
					</Card>
				</Col>
			</Row>
			<Row className="d-flex flex-column m-3">
				<h1>описание</h1>
				{track.info.map((info, index) => (
					<Row
						key={info.id}
						style={{
							background: index % 2 === 0 ? "lightgray" : "transparent",
							padding: 10,
						}}
					>
						{info.title}: {info.description}
					</Row>
				))}
			</Row>
		</Container>
	)
}

export default TrackPage
