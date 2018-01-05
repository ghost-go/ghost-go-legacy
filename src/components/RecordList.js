import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'material-ui/List';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { StyleSheet, css } from 'aphrodite';

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
    padding: '8px',
  },

  date: {
    marginTop: 'auto',
    marginBottom: '20px',
  },
});

export default class RecordList extends Component {
  static propTypes = {
    recordList: PropTypes.arrayOf(PropTypes.shape({})),
  }

  static defaultProps = {
    recordList: [],
  }

  render() {
    const list = [];
    this.props.recordList.forEach((i) => {
      list.push(
        <Link key={`${i.puzzle.id}`} to={`/puzzles/${i.puzzle.id}`}>
          <div className={css(style.listBox)}>
            <div className="list-preview-img">
              <img className={css(style.previewImg)} src={i.puzzle.preview_img_r1.x200.url} alt="" />
            </div>
            <div className={css(style.listRight)}>
              <span className={css(style.title)}>{`P-${i.puzzle.id}(${i.puzzle.rank})`}</span>
              <span>{i.puzzle.whofirst}</span>
              <span className={css(style.date)}>{moment(i.updated_at).format('YYYY-MM-DD')}</span>
            </div>
          </div>
        </Link>,
      );
    });

    return (
      <List>
        { list }
      </List>
    );
  }
}

