import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Clear from 'material-ui/svg-icons/content/clear';
import Done from 'material-ui/svg-icons/action/done';
import _ from 'lodash';

import { StyleSheet, css } from 'aphrodite';

const style = StyleSheet.create({

  listBox: {
    position: 'relative',
    padding: '5px',
    cursor: 'pointer',
    display: 'flex',
    ':hover': {
      backgroundColor: '#eee',
    },
  },

  symbol: {
    position: 'absolute',
    right: '5px',
    bottom: '10px',
    width: '50px',
    height: '50px',
  },

  colorRed: {
    color: 'red',
  },

  colorGreen: {
    color: 'green',
  },

  selected: {
    backgroundColor: '#eee',
  },

  previewImg: {
    width: '100px',
  },

  title: {
    fontSize: '18px',
  },

  listRight: {
    padding: '10px',
  },

});

export default class PuzzleList extends Component {

  static propTypes = {
    puzzleList: PropTypes.arrayOf({}).isRequired,
    record: PropTypes.arrayOf({}).isRequired,
  }

  static defaultProps = {
    puzzleList: [],
  }

  constructor(props) {
    super(props);
  }

  render() {
    const list = [];

    this.props.puzzleList.forEach((i) => {
      const record = _.find(this.props.record, { puzzle_id: i.id });
      let result;
      if (record === undefined || record === null) {
        result = null;
      } else if (record.isRight) {
        result = <Done className={css(style.symbol, style.colorGreen)} />;
      } else {
        result = <Clear className={css(style.symbol, style.colorRed)} />;
      }

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
              <div>{result}</div>
            </div>
          </div>
          <Divider />
        </div>,
      );
    });

    return (
      <List>
        { list }
      </List>
    );
  }
}

