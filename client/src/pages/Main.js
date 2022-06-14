import { observer } from 'mobx-react';
import React, { useContext, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Context } from '..';
import Pages from '../components/Pages';
// import PerformerBar from '../components/PerformerBar';
import TrackList from '../components/TrackList';
import TypeBar from '../components/TypeBar';
import { fetchPerformers, fetchTracks, fetchTypes } from '../http/trackAPI';

const Main = observer( () => {
    
    const {track} = useContext(Context)

    useEffect(() => {
        fetchTypes().then(data => track.setTypes(data))
        // fetchPerformers().then(data => track.setPerformers(data))
        fetchTracks(null, null, 1, 9).then(data => {
            track.setTracks(data.rows)
            track.setTotalCount(data.count)
        })
    }, [])
    useEffect(
        () => {
            if(track.selectedType === "all") {
                    fetchTracks(null, track.page, 9).then(data => {
                        track.setTracks(data.rows);
                        track.setTotalCount(data.count);
                    });
                } else {
                    fetchTracks(track.selectedType.id, track.page, 9).then(data => {
                        track.setTracks(data.rows);
                        track.setTotalCount(data.count);
                    });
                }
        }, [track.page, track.selectedType],
    );
    // useEffect(() => {
    //     fetchTracks(track.selectedType.id, track.selectedPerformer.id, track.page, 2).then(data => {
    //         track.setTracks(data.rows)
    //         track.setTotalCount(data.count)
    //     })
    // }, [track.page, track.selectedType, track.selectedPerformer,])

    return (
        <Container>
            <Row>
                <Col md={3}>
                    <TypeBar/>
                </Col>

                <Col md={9}>
                    {/* <PerformerBar/> */}
                    <TrackList/>
                    <Pages/ >
                </Col>

            </Row>
            <div>
                
            </div>
        </Container>
       
    );
});

export default Main;
