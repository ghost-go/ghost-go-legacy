import React, { Component, PropTypes } from 'react'
import {List, ListItem} from 'material-ui/List'

import { StyleSheet, css } from 'aphrodite'

export default class PuzzleList extends Component {


  static propTypes = {
    puzzleList: React.PropTypes.array.isRequired
  }

  static defaultProps = {
    puzzleList: []
  }

  constructor(props) {
    super(props)
  }

  render() {
    let list = []
    this.props.puzzleList.forEach((i) => {
      list.push(
        <div className="list-item">
          <div className="list-preview-img">
            <img className="preview-img" src={i.preview_img_r1.preview_img_r1.x200.url} />
          </div>
          <div>
            <span>{`${i.number}(${i.rank})`}</span>
            <br />
            <span>Tag: some tags</span>
          </div>
        </div>
      )
    })

    return (
      <List>
        { list }
      </List>
    )

  }
}
