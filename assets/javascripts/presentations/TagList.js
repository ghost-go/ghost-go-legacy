import React, { Component, PropTypes } from 'react'

export default class TagList extends Component {

  static propTypes = {
    tags: PropTypes.array.isRequired
  }

  render() {
    let tag_lists = []
    if (!this.props.tags) return null
    this.props.tags.forEach((tag) => {
      tag_lists = <a>{tag}</a>
    })
    return (
      <div>
        {tag_lists}
      </div>
    )
  }
}


