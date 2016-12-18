import React, { Component, PropTypes } from 'react'
import {List, ListItem} from 'material-ui/List'
import { Link } from 'react-router'
import moment from 'moment'

import { StyleSheet, css } from 'aphrodite'

export default class RecordList extends Component {


  static propTypes = {
    recordList: React.PropTypes.array.isRequired
  }

  static defaultProps = {
    recordList: []
  }

  constructor(props) {
    super(props)
  }

  render() {
    let list = []
    this.props.recordList.forEach((i) => {
      list.push(
        <Link to={`/puzzles/${i.id}`}>
          <div className={css(style.listBox)}>
            <div className="list-preview-img">
              <img className={css(style.previewImg)} src={i.puzzle.preview_img_r1.x200.url} />
            </div>
            <div className={css(style.listRight)}>
              <span className={css(style.title)}>{`${i.puzzle.number}(${i.puzzle.rank})`}</span>
              <span>{i.puzzle.whofirst}</span>
              <span className={css(style.date)}>{moment(i.puzzle.created_at).format('YYYY-MM-DD')}</span>
            </div>
          </div>
        </Link>
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
    display: 'flex',
    width: '300px',
    height: '120px',
    float: 'left',
  },

  previewImg: {
    width: '100px',
  },

  title: {
    fontSize: '20px',
  },

  listRight: {
    display: 'flex',
    flexDirection: 'column',
    padding: '8px'
  },

  date: {
    marginTop: 'auto',
    marginBottom: '20px',
  }

})
