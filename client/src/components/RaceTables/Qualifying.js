import React from 'react'
import "./styles.css"

const Qualifying = ({qualifying}) => {
    return (
        <div>
            <span className="subTitle">Qualifying</span>
            <div className="tableContainer qualifying">
                <table>
                    <col />
                    <colgroup span="1"></colgroup>
                    <colgroup span="1"></colgroup>
                    <colgroup span="3"></colgroup>
                    <tr>
                        <th colspan="1" scope="colgroup">Pos.</th>
                        <th colspan="1" scope="colgroup">Driver</th>
                        <th colspan="3" scope="colgroup">Times</th>
                    </tr>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col">Q1</th>
                        <th scope="col">Q2</th>
                        <th scope="col">Q3</th>
                    </tr>
                    {
                        qualifying.map((race, index) => {
                            return (
                                <tr>
                                    <td>
                                        {race['position']}
                                    </td>
                                    <td>
                                        <div className="raceTableName">
                                            <span>{race['Driver']['givenName'][0]}. {race['Driver']['familyName']}</span>
                                            <span># {race['number']} {race['Constructor']['name']}</span>
                                        </div>
                                    </td>
                                    <td>
                                        {race['Q1'] && race['Q1']}
                                    </td>
                                    <td>
                                        {race['Q2'] && race['Q2']}
                                    </td>
                                    <td>
                                        {race['Q3'] && race['Q3']}
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </table>
            </div>
        </div>
    )
}

export default Qualifying
