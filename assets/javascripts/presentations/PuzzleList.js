import React, { Component, PropTypes } from 'react'
import {List, ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider'

import { StyleSheet, css } from 'aphrodite'

export default class PuzzleList extends Component {


  static propTypes = {
    puzzleList: React.PropTypes.array.isRequired,
    record: React.PropTypes.array.isRequired
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
        <div key={`P-${i.id}`}>
          <div onClick={this.props.puzzleListOnClick.bind(this, i.id)} className={this.props.currentPuzzleId === i.id ? css(style.listBox, style.selected) : css(style.listBox)}>
            <div className="list-preview-img">
              <img className={css(style.previewImg)} src={i.preview_img_r1.x200.url} />
            </div>
            <div className={css(style.listRight)}>
              <span className={css(style.title)}>{`${i.number}(${i.rank})`}</span>
              <br />
              <span>{i.whofirst}</span>
            </div>
          </div>
          <Divider />
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
    padding: '5px',
    cursor: 'pointer',
    display: 'flex',
    ':hover': {
      backgroundColor: '#eee'
    }
  },

  selected: {
    backgroundColor: '#eee'
  },

  previewImg: {
    width: '100px',
  },

  title: {
    fontSize: '18px',
  },

  listRight: {
    padding: '10px'
  }

})
