import React from 'react'
import { SwapiServiceConsumer } from '../swapi-service-context/swapi-service-context'

const withSwapiService = mapMathodsToProps => Wrapped => {
  return props => {
    return (
      <SwapiServiceConsumer>
        {swapiService => {
          const serviceProps = mapMathodsToProps(swapiService)

          return <Wrapped {...props} {...serviceProps} />
        }}
      </SwapiServiceConsumer>
    )
  }
}

export default withSwapiService
