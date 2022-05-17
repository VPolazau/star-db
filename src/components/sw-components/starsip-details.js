import React from 'react'

import ItemDetails, { Record } from '../item-details'
import { withSwapiService } from '../hoc-helpers'

const StarshipDetails = props => {
  return (
    <ItemDetails {...props}>
      <Record field='model' label='Model' />
      <Record field='length' label='Length' />
      <Record field='manufacturer' label='Manufacturer' />
      <Record field='costInCredits' label='Cost' />
      <Record field='crew' label='Crew' />
      <Record field='passengers' label='Passengers' />
      <Record field='cargoCapasity' label='Cargo capasity' />
    </ItemDetails>
  )
}

const mapMethodsToProps = swapiService => {
  return {
    getData: swapiService.getStarship,
    getImageUrl: swapiService.getStarshipImage,
  }
}

export default withSwapiService(mapMethodsToProps)(StarshipDetails)
