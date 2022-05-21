import React, { Component } from 'react'
import SwapiService from '../../services/swapi-service'
// import DummySwapiService from '../../services/dummy-swapi-service'
import ErrorBoundry from '../error-boundry'
import Header from '../header'
import RandomPlanet from '../random-planet'
import { SwapiServiceProvider } from '../swapi-service-context/swapi-service-context'
import { PeoplePage, PlanetsPage, StarshipsPage, LoginPage, SecretPage } from '../pages'
import { StarshipDetails } from '../sw-components'

import './app.css'

import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom'

export default class App extends Component {
    state = {
        swapiService: new SwapiService(),
        isLoggedIn: false,
    }

    onLoggin = () => {
        this.setState({ isLoggedIn: true })
    }

    onServiceChange = () => {
        this.setState(({ swapiService }) => {
            const Service = swapiService instanceof SwapiService
            // ? DummySwapiService
            // : SwapiService

            return { swapiService: new Service() }
        })
    }

    render() {
        const { swapiService, isLoggedIn } = this.state
        return (
            <ErrorBoundry>
                <SwapiServiceProvider value={swapiService}>
                    <Router>
                        <div className='container stardb-app'>
                            <Header onServiceChange={this.onServiceChange} />
                            <RandomPlanet />

                            <Routes>
                                <Route path='/' element={<h1>Welcome to StarDB</h1>} />
                                <Route path='/people/*' element={<PeoplePage />}>
                                    <Route path=':person' element={<PeoplePage />} />
                                </Route>
                                <Route path='/planets/' element={<PlanetsPage />} />
                                <Route path='/starships/' element={<StarshipsPage />} />
                                <Route
                                    path='/starships/:starshipId'
                                    element={<InvoiceStarships />}
                                />
                                <Route
                                    path='/login'
                                    element={<LoginPage onLogin={this.onLoggin} />}
                                ></Route>
                                <Route
                                    path='/secret'
                                    element={<SecretPage isLoggedIn={isLoggedIn} />}
                                ></Route>
                            </Routes>
                        </div>
                    </Router>
                </SwapiServiceProvider>
            </ErrorBoundry>
        )
    }
}

const InvoiceStarships = () => {
    let { starshipId } = useParams()
    return <StarshipDetails itemId={starshipId} />
}
