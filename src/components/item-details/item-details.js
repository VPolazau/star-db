import React, { Component } from 'react'
import ErrorButton from '../error-button/error-button'
import Spinner from '../spinner/spinner'

import './item-details.css'

const Record = ({ item, field, label }) => {
  return (
    <li className='list-group-item'>
      <span className='term'>{label} : </span>
      <span>{item[field]}</span>
    </li>
  )
}

export { Record }

export default class ItemDetails extends Component {
  state = {
    item: null,
    loading: true,
    image: null,
  }

  componentDidMount() {
    this.updateItem()
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.itemId !== prevProps.itemId ||
      this.props.getData !== prevProps.getData ||
      this.props.getImageUrl !== prevProps.getImageUrl
    ) {
      this.setState({ loading: true })
      this.updateItem()
    }
  }

  updateItem() {
    const { itemId, getData, getImageUrl } = this.props
    if (!itemId) {
      return
    }

    getData(itemId).then(item => {
      this.setState({
        item,
        loading: false,
        image: getImageUrl(item),
      })
    })
  }

  render() {
    if (!this.state.item) {
      return <span>Select a item from a list</span>
    }

    const { item, loading, image } = this.state

    const spinner = loading ? <Spinner /> : null
    const content = !loading ? (
      <ItemView item={item} image={image} props={this.props} />
    ) : null

    return (
      <div className='item-details card'>
        {spinner}
        {content}
      </div>
    )
  }
}

const ItemView = ({ item, image, props }) => {
  const { name } = item

  return (
    <React.Fragment>
      <img className='item-image' src={image} alt='item' />

      <div className='card-body'>
        <h4>{name}</h4>
        <ul className='list-group list-group-flush'>
          {React.Children.map(props.children, child => {
            return React.cloneElement(child, { item })
          })}
        </ul>
        <ErrorButton />
      </div>
    </React.Fragment>
  )
}
