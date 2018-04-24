import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { StyleSheet, css } from 'aphrodite';

import PuzzleFilterBar from '../components/PuzzleFilterBar';
import { fetchPuzzles, fetchTags } from '../actions/FetchActions';
import { setToolbarHidden } from '../actions/Actions';

const styles = StyleSheet.create({
  loading: {
    width: '100px',
    height: '100px',
    paddingTop: '100px',
    fontSize: '100px',
    margin: '0 auto',
  },
});

function mapStateToProps(state) {
  return {
    puzzles: state.puzzles,
    rangeFilter: state.rangeFilter,
    tagFilter: state.tagFilter,
    tags: state.tags,
  };
}

@connect(mapStateToProps)
export default class Puzzles extends Component {
  static propTypes = {
    tags: PropTypes.shape({}).isRequired,
    puzzles: PropTypes.shape({}).isRequired,
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.shape({
      query: PropTypes.shape({
        page: PropTypes.string,
        rank: PropTypes.string,
      }),
    }).isRequired,
  }

  componentWillMount() {
    const query = new URLSearchParams(this.props.location);
    this.props.dispatch(fetchTags({}));
    this.props.dispatch(fetchPuzzles({
      page: query.get('page'),
      rank: query.get('rank'),
    }));
    this.props.dispatch(setToolbarHidden(true));
  }

  render() {
    const { puzzles, tags } = this.props;
    if (_.isNil(puzzles) || _.isNil(tags) || _.isNil(tags.data)) return null;
    let puzzlesCards = [];

    if (!puzzles.isFetching && puzzles.data != null && puzzles.data.puzzles.length > 0) {
      puzzles.data.puzzles.forEach((i) => {
        const puzzleCard = (
          <div key={i.id} className="puzzle-card">
            <Link to={`/problems/${i.id}`}>
              <img src={i.preview_img_r1.x300.url} alt="" />
            </Link>
            <div className="puzzle-info">
              <span>Level: {i.rank}</span>
              { i.whofirst === 'Black First' ? <div className="black-ki-shape" /> : <div className="white-ki-shape" /> }
            </div>
          </div>
        );
        puzzlesCards.push(puzzleCard);
      });
    } else {
      puzzlesCards = (
        <div className={css(styles.loading)}>
          <i className="fa fa-spinner fa-pulse fa-fw" />
        </div>
      );
    }
    return (
      <div>
        <PuzzleFilterBar />
        <div className={css(styles.puzzleContent)}>
          { puzzlesCards }
        </div>
        <div className="clearfix" />
      </div>
    );
  }
}

