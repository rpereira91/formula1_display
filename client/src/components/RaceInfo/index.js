import React, {useState, useEffect} from 'react'
import { getQualifying, getResults } from '../../utils/api';
import { Container, Loader, Button, Modal, Header } from 'semantic-ui-react';
const RaceInfo = ({season, round, url = null}) => {
    const [qualifying, setQualifying] = useState([])
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)


    useEffect(() => {
        const displayInfo = () => {
            getQualifying(season, round)
                .then((qualifying) => {
                    setQualifying(qualifying.Races[0]['QualifyingResults'])
                })
                .then(() => {
                    getResults(season, round)
                        .then((results) => {
                            setResults(results.Races[0]['Results'])
                            console.log(results.Races[0]['Results'])
                        }
                        )
                        .catch((err) => console.log(err))
                })
                .catch((err) => console.log(err))
                .finally(() => setLoading(false))
        }
        displayInfo()

    }, [season, round])
    return !loading ? (
        <Container>
            <Container textAlign='left'>Qualifying: {qualifying.length > 0 ? "Complete" : "Incomplete"}</Container>
            <Container textAlign='left'>Race Status: {results.length > 0 ? "Complete" : "Incomplete"}</Container>
            <Button onClick={() => setShowModal(true)}>More Info</Button>
            {url && <Button onClick={() => window.open(url, "_blank")}>Wiki</Button>}
            <Modal
                basic
                onClose={() => setShowModal(false)}
                onOpen={() => setShowModal(true)}
                open={showModal}
                size='small'
                >
                <Header icon>
                    Race Name
                </Header>
                <Modal.Content>
                    <p>
                    Your inbox is getting full, would you like us to enable automatic
                    archiving of old messages?
                    </p>
                </Modal.Content>
                <Modal.Actions>
                    <Button basic color='red' inverted onClick={() => setShowModal(false)}>
                        Dismiss
                    </Button>
                </Modal.Actions>
            </Modal>
        </Container>
    ) : <Loader content='Loading races...'/>
}


export default RaceInfo
