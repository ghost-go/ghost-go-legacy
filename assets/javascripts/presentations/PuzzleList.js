import React, { Component, PropTypes } from 'react'
import {List, ListItem} from 'material-ui/List'

export default class PuzzleList extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    let list = []
    this.props.puzzleList.forEach((i) => {
      list.push(
        <ListItem
          leftAvatar={
            <img src={i.preview_img_r1.preview_img_r1.url} />
            }
          rightIcon=''
          primaryText={`${i.number}(${i.rank})`}
          secondaryText="Tag: some tags"
        />
      )
    })

    return (
      <List>
        { list }
      </List>
    )

  }

}
