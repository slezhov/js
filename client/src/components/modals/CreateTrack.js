import React, { useContext, useEffect, useState } from "react"
import Modal from "react-bootstrap/Modal"
import { Button, Dropdown, Form, Row, Col } from "react-bootstrap"
import { Context } from "../../index"
import {
	createTrack,
	fetchPerformers,
	fetchTracks,
	fetchTypes,
} from "../../http/trackAPI"
import { observer } from "mobx-react"


const CreateTrack = observer(({ show, onHide }) => {
	const { track, user } = useContext(Context)
	const [name, setName] = useState("")
	const [price, setPrice] = useState(0)
	const [img, setImg] = useState(null)
	const [mp3, setMp3] = useState(null)
	const [wav, setWav] = useState(null)
	const [zip, setZip] = useState(null)
	const [tag, setTag] = useState(null)
	const [info, setInfo] = useState([])

	useEffect(() => {
		fetchTypes().then((data) => track.setTypes(data))
		//fetchPerformers().then((data) => track.setPerformers(data))
	}, [])

	const addInfo = () => {
		setInfo([...info, { title: "", description: "", number: Date.now() }])
	}
	const removeInfo = (number) => {
		setInfo(info.filter((i) => i.number !== number))
	}
	const changeInfo = (key, value, number) => {
		setInfo(info.map((i) => (i.number === number ? { ...i, [key]: value } : i)))
	}

	const selectImg = (e) => {
		setImg(e.target.files[0])
	}
	const selectMp3 = (e) => {
		setMp3(e.target.files[0])
	}
	const selectWav = (e) => {
		setWav(e.target.files[0])
	}
	const selectZip = (e) => {
		setZip(e.target.files[0])
	}
	const selectTag = (e) => {
		setTag(e.target.files[0])
	}
	

	const addTrack = () => {
		console.log('token')
		const formData = new FormData()
		formData.append("name", name)
		formData.append("price", `${price}`)
		formData.append("img", img)
		formData.append("mp3", mp3)
		formData.append("wav", wav)
		formData.append("zip", zip)
		formData.append("tag", tag)
		formData.append("typeId", track.selectedType.id)
		formData.append("userId", 9)
		formData.append("info", JSON.stringify(info))
		createTrack(formData).then((data) => onHide())
	}

	return (
		<Modal show={show} onHide={onHide} centered>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Загрузить трек
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Dropdown className="mt-2 mb-2">
						<Dropdown.Toggle>
							{track.selectedType.name || "Выберите тип"}
						</Dropdown.Toggle>
						<Dropdown.Menu>
							{track.types.map((type) => (
								<Dropdown.Item
									onClick={() => track.setSelectedType(type)}
									key={type.id}
								>
									{type.name}
								</Dropdown.Item>
							))}
						</Dropdown.Menu>
					</Dropdown>
					{/* <Dropdown className="mt-2 mb-2">
						<Dropdown.Toggle>
							{track.selectedPerformer.name || "Выберите тип"}
						</Dropdown.Toggle>
						<Dropdown.Menu>
							{track.performers.map((performer) => (
								<Dropdown.Item
									onClick={() => track.setSelectedPerformer(performer)}
									key={performer.id}
								>
									{performer.name}
								</Dropdown.Item>
							))}
						</Dropdown.Menu>
					</Dropdown> */}
					<Form.Control
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="mt-3"
						placeholder="Введите название трека"
					/>
					<Form.Control
						value={price}
						onChange={(e) => setPrice(Number(e.target.value))}
						className="mt-3"
						placeholder="Введите стоимость трека"
						type="number"
					/>
					<Form.Control className="mt-3" type="file" onChange={selectImg} />
					<Form.Control className="mt-3" type="file" onChange={selectMp3} />
					<Form.Control className="mt-3" type="file" onChange={selectWav} />
					<Form.Control className="mt-3" type="file" onChange={selectZip} />
					<Form.Control className="mt-3" type="file" onChange={selectTag} />
					
					<hr />
					<Button variant={"outline-dark"} onClick={addInfo}>
						Добавить новое свойство
					</Button>
					{info.map((i) => (
						<Row className="mt-4" key={i.number}>
							<Col md={4}>
								<Form.Control
									value={i.title}
									onChange={(e) =>
										changeInfo("title", e.target.value, i.number)
									}
									placeholder="Введите название свойства"
								/>
							</Col>
							<Col md={4}>
								<Form.Control
									value={i.description}
									onChange={(e) =>
										changeInfo("description", e.target.value, i.number)
									}
									placeholder="Введите описание свойства"
								/>
							</Col>
							<Col md={4}>
								<Button
									onClick={() => removeInfo(i.number)}
									variant={"outline-danger"}
								>
									Удалить
								</Button>
							</Col>
						</Row>
					))}
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="outline-danger" onClick={onHide}>
					Закрыть
				</Button>
				<Button variant="outline-success" onClick={addTrack}>
					Добавить
				</Button>
			</Modal.Footer>
		</Modal>
	)
})

export default CreateTrack
