import React, { Component, PropTypes } from 'react'

export default class TagList extends Component {

  static propTypes = {
    tags: PropTypes.array.isRequired
  }

  static defaultProps = {
    tags: []
  }

  render() {
    let tag_lists = []
    this.props.tags.forEach((tag) => {
      tag_lists.push(<li className='tag' key={tag.id}>{`${tag.name} (${tag.taggings_count})`}</li>)
    })
    return (
      <div>
        <ul className="tags">
          { tag_lists }
        </ul>
      </div>
    )
  }
}
