import React, { useEffect, useState } from "react"
import {
	Button,
	Col,
	Container,
	Dropdown,
	Form,
	Image,
	InputGroup,
	ListGroup,
	Pagination,
	Row,
} from "react-bootstrap"
// import CreatePerformer from "../components/modals/CreatePerformer";
import CreateTrack from "../components/modals/CreateTrack"
import CreateType from "../components/modals/CreateType.js"
import { fetchTracks, getAllTracksInAdminPage } from "../http/trackAPI"

const Upload = () => {
	// const [performerVisible, setPerformerVisible] = useState(false)
	const [typeVisible, setTypeVisible] = useState(false)
	const [trackVisible, setTrackVisible] = useState(false)
	const [searchTrack, setSearchTrack] = useState("")
	const [searchedTrack, setSearchedTrack] = useState([])
	const [filter, setFilter] = useState("All")
	const [currentPage, setCurrentPage] = useState(1)
	const [count, setCount] = useState(1)

	const [successMsg, setSuccessMsg] = useState("")
	const [showSuccessMsg, setShowSuccessMsg] = useState(false)

    const limit = 7;
    const pageCount = Math.ceil(Number(count) / limit);
    const pages = [];
    for (let number = 1; number < pageCount + 1; number++) {
        pages.push(
            <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
                {number}
            </Pagination.Item>
        );
    }


    useEffect(() => {
        getAllTracksInAdminPage(searchTrack, currentPage, filter).then(({count, rows}) => {
            setSearchedTrack(rows);
            setCount(count)
        })
    }, [currentPage])

    useEffect(() => {
        getAllTracksInAdminPage(searchTrack, 1, filter).then(({count, rows}) => {
            setSearchedTrack(rows);
            setCount(count);
            setCurrentPage(1);
        })
    }, [filter, successMsg])


    const fetchTrack = () => {
        getAllTracksInAdminPage(searchTrack, currentPage, filter).then(({count, rows}) => {
            setSearchedTrack(rows);
            setCount(count)
        })
    };

    const showSuccessMsgFunc = (msg) => {
        setSuccessMsg(msg);
        setShowSuccessMsg(true);
        setTimeout(() => setShowSuccessMsg(false), 5000);
    }

	return (
		<Container className="d-flex flex-column">
			<Button
				variant={"outline-dark"}
				className="mt-4 p-2"
				onClick={() => setTypeVisible(true)}
			>
				Добавить фильтр 1
			</Button>
			{/* <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setPerformerVisible(true)}
            >
                Добавить фильтр 2
            </Button> */}
			<Button
				variant={"outline-dark"}
				className="mt-4 p-2"
				onClick={() => setTrackVisible(true)}
			>
				Загрузить трек
			</Button>
			{/* <CreatePerformer show={performerVisible} onHide={() => setPerformerVisible(false)}/> */}
			<CreateTrack show={trackVisible} onHide={() => setTrackVisible(false)} />
			<CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
			<Dropdown className="mt-5 mb-3" style={{ margin: "0 auto" }}>
				<Dropdown.Toggle variant="success" id="dropdown-basic">
					{filter}
				</Dropdown.Toggle>

				<Dropdown.Menu>
					{filter === "All" ? (
						<Dropdown.Item disabled>All</Dropdown.Item>
					) : (
						<Dropdown.Item onClick={() => setFilter("All")}>All</Dropdown.Item>
					)}
					{filter === "Without Brand or Type" ? (
						<Dropdown.Item disabled>Without Type</Dropdown.Item>
					) : (
						<Dropdown.Item onClick={() => setFilter("Without Brand or Type")}>
							Without Type
						</Dropdown.Item>
					)}
				</Dropdown.Menu>
			</Dropdown>

			<InputGroup className="mb-3">
				<Form.Control
					aria-label="Default"
					aria-describedby="inputGroup-sizing-default"
					value={searchTrack}
					onChange={(e) => setSearchTrack(e.target.value)}
					placeholder="Input Track name..."
				/>
				<Button onClick={fetchTrack} variant="outline-dark" className="ml-2">
					Search
				</Button>
			</InputGroup>

			<ListGroup>
				{searchedTrack &&
					searchedTrack.map(({ id, img, mp3, wav, zip, tag, type, user, price, name }) => {
						return (
							<ListGroup.Item className="mt-3" key={id}>
								<Row>
									<Col xs={2}>
										<Image
											width={150}
											src={process.env.REACT_APP_API_URL + img}
										/>
									</Col>
									<Col xs={8}>
										<Row>
											<Col xs={12}>
                                            изменить трек
												{/* <NavLink to={Track_EDIT_ROUTE + `/${id}`}>
													id: {id}
												</NavLink> */}
											</Col>
										</Row>
										<Row>
											<Col xs={12}>Name: {name}</Col>
										</Row>
										<Row>
											<Col xs={12}>Price: {price}</Col>
										</Row>
										
										<Row>
											<Col xs={12}>Type: {type.name}</Col>
										</Row>
									</Col>
									<Col xs={2}>
                                        изменить трек
										{/* <NavLink to={TRACK_EDIT_ROUTE + `/${id}`}>Edit</NavLink> */}
									</Col>
								</Row>
							</ListGroup.Item>
						)
					})}
			</ListGroup>

			<Pagination size="sm" className="mt-4 mb-4" style={{ margin: "0 auto" }}>
				{searchedTrack && searchedTrack.length > 0 ? pages : false}
			</Pagination>
		</Container>
	)
}

export default Upload
