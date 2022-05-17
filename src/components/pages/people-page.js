import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Row from '../row'
import { PersonList, PersonDetails } from '../sw-components'

const PeoplePage = () => {
  let navigate = useNavigate()
  let {person}= useParams()
  return (
    <Row
      left={<PersonList onItemSelected={(id) => {navigate(id)}} />}
      right={<PersonDetails itemId={person} />}
    />
  )
}

export default PeoplePage
