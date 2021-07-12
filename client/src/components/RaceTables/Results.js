import React from 'react'
import "./styles.css"
const Results = ({results}) => {
    return (
        <div>
             <span className="subTitle">Results</span>
                    {results.length > 0 && (
                        <table>
                            <tr>
                                <th>Position</th>
                                <th>Driver</th>
                                <th>Time</th>
                                <th>Points</th>
                            </tr>
                            {
                                results.map((race) => (
                                    <tr>
                                        <td>{race['position']}</td>
                                        <td>
                                        <div className="raceTableName">
                                            <span>{race['Driver']['givenName'][0]}. {race['Driver']['familyName']}</span>
                                            <span># {race['number']} {race['Constructor']['name']}</span>
                                        </div>
                                        </td>
                                        <td>{race['Time'] ? race['Time']['time'] : race['status']}</td>
                                        <td>{race['points'] && race['points']}</td>
                                    </tr>
                                ))
                            }
                        </table>
                    )}
        </div>
    )
}

export default Results
