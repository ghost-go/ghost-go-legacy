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

const PuzzleListItem = (props) => {
  const onClick = () => {
    props.puzzleListOnClick(props.puzzle.id);
  };

  return (
    <button
      onClick={onClick}
      className={props.selected ? css(style.listBox, style.selected) : css(style.listBox)}
    >
      <div className="list-preview-img">
        <img className={css(style.previewImg)} src={props.puzzle.preview_img_r1.x200.url} alt="" />
      </div>
      <div className={css(style.listRight)}>
        <span className={css(style.title)}>{`${props.puzzle.number}(${props.puzzle.rank})`}</span>
        <br />
        <span>{props.puzzle.whofirst}</span>
        <div>{props.result}</div>
      </div>
    </button>
  );
};

PuzzleListItem.propTypes = {
  selected: PropTypes.bool.isRequired,
  puzzle: PropTypes.shape({
    id: PropTypes.number.isRequired,
    number: PropTypes.string.isRequired,
    rank: PropTypes.string.isRequired,
    whofirst: PropTypes.string.isRequired,
    preview_img_r1: PropTypes.shape({
      x200: PropTypes.shape({
        url: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  puzzleListOnClick: PropTypes.func.isRequired,
  result: PropTypes.string.isRequired,
};

export default class PuzzleList extends Component {
  static propTypes = {
    puzzleList: PropTypes.arrayOf({}).isRequired,
    record: PropTypes.arrayOf({}).isRequired,
    puzzleListOnClick: PropTypes.func.isRequired,
    currentPuzzleId: PropTypes.number.isRequired,
  }

  static defaultProps = {
    puzzleList: [],
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
          <PuzzleListItem
            selected={this.props.currentPuzzleId === i.id}
            puzzle={i}
            puzzleListOnClick={this.props.puzzleListOnClick}
            result={result}
          />
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
