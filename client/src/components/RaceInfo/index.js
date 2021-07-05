import React, {useState, useEffect} from 'react'
import { getQualifying, getResults } from '../../utils/api';
import { Table, Loader, Button, } from 'semantic-ui-react';
import './styles.css'
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
            <div  className="raceTables">
                <div className="quali table">
                    Qualifying: {qualifying.length > 0 ? "Complete" : "Incomplete"}
                    {
                        qualifying.length > 0 && (
                            <div>
                                <Table>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell rowSpan='2'>Pos.</Table.HeaderCell>
                                            <Table.HeaderCell rowSpan='2'>Driver</Table.HeaderCell>
                                            <Table.HeaderCell colSpan='3'>Times</Table.HeaderCell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.HeaderCell>Q1</Table.HeaderCell>
                                            <Table.HeaderCell>Q2</Table.HeaderCell>
                                            <Table.HeaderCell>Q3</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    {
                                        qualifying.map((race, index) => {
                                            return (
                                                <Table.Row>
                                                    <Table.Cell>
                                                        {race['position']}
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <div className="raceTableName">
                                                            <span>{race['Driver']['givenName'][0]}. {race['Driver']['familyName']}</span>
                                                            <span># {race['number']} {race['Constructor']['name']}</span>
                                                        </div>
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        {race['Q1'] && race['Q1']}
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        {race['Q2'] && race['Q2']}
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        {race['Q3'] && race['Q3']}
                                                    </Table.Cell>
                                                </Table.Row>
                                            )
                                        })
                                    }
                                </Table>
                        </div>)
                    }
                </div>
                <div  className="results table">
                    Race Status: {results.length > 0 ? "Complete" : "Incomplete"}
                    {
                        results.length > 0 && (
                            <div>
                            <Table>
                                <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell rowSpan='2'>Pos.</Table.HeaderCell>
                                                <Table.HeaderCell rowSpan='2'>Driver</Table.HeaderCell>
                                                <Table.HeaderCell rowSpan='2'>Laps</Table.HeaderCell>
                                                <Table.HeaderCell colSpan='2'>Times</Table.HeaderCell>
                                                <Table.HeaderCell rowSpan='2'>Points</Table.HeaderCell>
                                            </Table.Row>
                                            <Table.Row>
                                                <Table.HeaderCell>Final/Retired</Table.HeaderCell>
                                                <Table.HeaderCell>Fastest Lap</Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Header>
                                {
                                    results.map((race, index) => {
                                        return (
                                            <Table.Row>
                                                <Table.Cell>
                                                    {race['position']}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <div className="raceTableName">
                                                        <span>{race['Driver']['givenName'][0]}. {race['Driver']['familyName']}</span>
                                                        <span># {race['number']} {race['Constructor']['name']}</span>
                                                    </div>
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {race['laps']}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {race['Time'] ? race['Time']['time'] : race['status']}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {race['FastestLap'] ? race['FastestLap']['Time']['time'] : 'No Fastest Lap'}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {race['points'] && race['points']}
                                                </Table.Cell>
                                            </Table.Row>
                                        )
                                    })
                                }
                        </Table>
                        </div>)
                    }
                </div>
            </div>
        </div>
    ) : <Loader content='Loading races...'/>
}


export default RaceInfo
