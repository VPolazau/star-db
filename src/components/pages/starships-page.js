import React from 'react'
import { useNavigate } from 'react-router-dom'
import { StarshipList } from '../sw-components'

const StarshipsPage = () => {
  let navigate = useNavigate()
  return (<StarshipList onItemSelected={(id) => {
    navigate(id)
  }} />)
}

export default StarshipsPage
