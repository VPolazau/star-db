import React from 'react'
import PropTypes from 'prop-types'
import './row.css'

const Row = ({ left, right }) => {
  return (
    <div className='row mb2'>
      <div className='col-md-6'>{left}</div>
      <div className='col-md-6'>{right}</div>
    </div>
  )
}

Row.propTypes = {
  // PropTypes.node проверяет, что соответвующий property - это что-то, ...
  // ... что можно отрендерить в jsx
  // Есть PropTypes.element, но он более узкий и принимает только реакт элементы
  left: PropTypes.node,
  right: PropTypes.node
}

export default Row
