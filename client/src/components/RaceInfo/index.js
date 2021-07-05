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
        <div>
            {/* <Button onClick={() => setShowModal(true)}>More Info</Button> */}
            {url && <Button onClick={() => window.open(url, "_blank")}>Wiki</Button>}
            <Container textAlign='left' fluid>
                Qualifying: {qualifying.length > 0 ? "Complete" : "Incomplete"}
                {
                    qualifying.length > 0 && (<div>
                        Qualifying: {
                            qualifying.map((race, index) => {
                                if (index < 5) {
                                    return (
                                        <div>{race['Driver']['givenName']} {race['Driver']['familyName']}</div>
                                    )
                                }
                            })
                        }
                    </div>)
                }
            </Container>
            <Container textAlign='right'>Race Status: {results.length > 0 ? "Complete" : "Incomplete"}
                {
                    results.length > 0 && (<div>
                        Results: {
                            results.map((race, index) => {
                                if (index < 5) {
                                    return (
                                        <div>{race['Driver']['givenName']} {race['Driver']['familyName']}</div>
                                    )
                                }
                            })
                        }
                    </div>)
                }
            </Container>
        </div>
    ) : <Loader content='Loading races...'/>
}


export default RaceInfo
