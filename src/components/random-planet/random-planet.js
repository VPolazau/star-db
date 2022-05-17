import React, { Component } from 'react'
import PropTypes from 'prop-types'

import SwapiService from '../../services/swapi-service'
import ErrorIndicator from '../error-indicator/error-indicator'
import Spinner from '../spinner/spinner'

import './random-planet.css'

export default class RandomPlanet extends Component {
  static defaultProps = {
    updateInterval: 10000,
  }

  static propTypes = {
    updateInterval: PropTypes.number,
  }
  swapiService = new SwapiService()

  state = {
    planet: {},
    loading: true,
    error: false,
  }

  componentDidMount() {
    const { updateInterval } = this.props
    this.updatePlanet()
    setInterval(this.updatePlanet, updateInterval)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  onPlanetLoaded = planet => {
    this.setState({ planet, loading: false })
  }

  onError = err => {
    this.setState({
      error: true,
      loading: false,
    })
  }

  updatePlanet = () => {
    // id от 2 до 19              (max-min+1)   (min)
    const id = Math.floor(Math.random() * 18) + 2
    this.swapiService
      .getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError)
  }

  render() {
    const { planet, loading, error } = this.state

    const hasData = !(loading || error)

    const errorMsg = error ? <ErrorIndicator /> : null
    const spinner = loading ? <Spinner /> : null
    const content = hasData ? <PlanetView planet={planet} /> : null

    return (
      <div className='random-planet jumbotron rounded'>
        {errorMsg}
        {spinner}
        {content}
      </div>
    )
  }
}

const PlanetView = ({ planet }) => {
  const { id, name, population, rotationPeriod, diameter } = planet

  return (
    <React.Fragment>
      <img
        src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
        alt='planet for star-db'
        className='planet-image'
      />
      <div>
        <h4>{name}</h4>
        <ul className='list-group list-group-flush'>
          <li className='list-group-item'>
            <span className='term'>Population</span>
            <span>{population}</span>
          </li>
          <li className='list-group-item'>
            <span className='term'>Rotation Period</span>
            <span>{rotationPeriod}</span>
          </li>
          <li className='list-group-item'>
            <span className='term'>Diameter</span>
            <span>{diameter}</span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  )
}
