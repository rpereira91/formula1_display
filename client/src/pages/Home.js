import React from 'react'
import { Container, Row, Col } from "shards-react";
import './PagesStyle.css'

const Home = () => {
    return (
        <Container className="pageContainer" fluid>
            <Row>
                <span className="title">Home</span>
            </Row>
            <Row>
                <Col sm="12" lg="6">
                    <p>
                        Welcome to my Formula One info page.
                        <br/>
                        The Schedule page has current and historic Grand Prix calendars, each Grand Prix has a link to the wiki and a way to view the race standings.  
                        <br/>
                        Check out the Driver page to view current and historic driver standings, more driver information will be available in the future.  
                        <br/>
                        The Last Race page will have race information including qualifying and the results. The URL can be updated to view any round from any season.  
                        <br/>
                        The Constructor page is still under construction.  
                    </p>
                    <p>Click the header in each section to change the year and view historic Formula One data. </p>
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
