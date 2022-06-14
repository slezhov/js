import React, {useContext} from 'react';
import {observer} from "mobx-react";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import TrackItem from "./TrackItem";

const TrackList = observer(() => {
    const {track} = useContext(Context)

    return (
        <Row className="d-flex">
            {track.tracks.map(track =>
                <TrackItem key={track.id} track={track}/>
            )}
        </Row>
    );
});

export default TrackList;