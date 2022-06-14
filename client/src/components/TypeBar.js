import React, {useContext} from 'react';
import {observer} from "mobx-react";
import {Context} from "../index";
import {ListGroup} from "react-bootstrap";

const TypeBar = observer(() => {
    const {track} = useContext(Context);

    const getAllTracks = () => {
        track.setSelectedType("all");
        //track.setSelectedPerformer("all");
    }

    return (
        <ListGroup>
            <ListGroup.Item
                style={{cursor: "pointer"}}
                active={"all" === track.selectedType}
                onClick={getAllTracks}
            >
                All
            </ListGroup.Item>
            {track.types.map(type =>
                <ListGroup.Item
                    style={{cursor: "pointer"}}
                    active={type.id === track.selectedType.id}
                    key={type.id}
                    onClick={() => track.setSelectedType(type)}
                >
                    {type.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default TypeBar;
