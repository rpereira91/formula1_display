import React from 'react'
import { Container } from 'semantic-ui-react'
import './PagesStyle.css'

const Home = () => {
    return (
        <Container className="pageContainer">
            <h1>F1 info</h1>
            <p>Click the header in each section to change the year</p>
            <p>This website uses the ergast API. </p>
        </Container>
    )
}

export default Home
