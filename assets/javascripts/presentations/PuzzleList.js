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
        <div onClick={this.props.puzzleListOnClick.bind(this, i.id)} className={css(style.listBox)}>
          <div className="list-preview-img">
            <img className={css(style.previewImg)} src={i.preview_img_r1.preview_img_r1.x200.url} />
          </div>
          <div className={css(style.listRight)}>
            <span className={css(style.title)}>{`${i.number}(${i.rank})`}</span>
            <br />
            <span>{i.whofirst}</span>
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

const style = StyleSheet.create({
  listBox: {
    cursor: 'pointer',
    display: 'flex',
  },

  previewImg: {
    width: '100px',
  },

  title: {
    fontSize: '20px',
  },

  listRight: {
    padding: '10px'
  }


})
