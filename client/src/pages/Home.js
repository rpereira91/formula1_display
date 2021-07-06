import React from 'react'
import { Container, Row, Col } from "shards-react";
import './PagesStyle.css'

const Home = () => {
    return (
        <Container className="pageContainer" fluid>
            <Row>
                <span className="title">F1 info</span>
            </Row>
            <Row>
                <Col sm="12" lg="6">
                    <p>Click the header in each section to change the year</p>
                </Col>
                <Col sm="12" lg="6">
                    <p>
                        This website uses the <a href="http://ergast.com/mrd/" target="_blank" rel="noreferrer">ergast</a> API. 
                        The Ergast Developer API is an experimental web service which provides a historical record of motor racing data for non-commercial purposes. 
                    </p>
                </Col>
            </Row>
        </Container>
    )
}

export default Home
