import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { StyleSheet, css } from 'aphrodite';

import PuzzleFilterBar from '../components/PuzzleFilterBar';
import { fetchTags } from '../actions/FetchActions';
import { setToolbarHidden } from '../actions/Actions';

import { graphql, QueryRenderer } from 'react-relay';
import environment from '../environment';

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
    rangeFilter: state.rangeFilter,
    tagFilter: state.tagFilter,
    tags: state.tags,
  };
}

@connect(mapStateToProps)
class Puzzles extends Component {
  static propTypes = {
    tags: PropTypes.shape({}).isRequired,
  }

  componentWillMount() {
    this.props.dispatch(fetchTags({}));
    this.props.dispatch(setToolbarHidden(true));
  }

  render() {
    const { tags } = this.props;
    if (_.isNil(tags) || _.isNil(tags.data)) return null;
    return (
      <div>
        <PuzzleFilterBar />
        <QueryRenderer
          environment={environment}
          query={graphql`
            query ProblemsQuery {
              problems {
                id,
                rank,
                whofirst,
                previewImgR1 {
                  x300
                },
              }
            }
          `}
          variables={{}}
          render={({error, props}) => {
            if (error) {
              return <div>Error!</div>;
            }
            if (!props) {
              return (
                <div className={css(styles.loading)}>
                  <i className="fa fa-spinner fa-pulse fa-fw" />
                </div>
              )
            }
            return (
              props.problems.map(i => (
                <div key={i.id} className="puzzle-card">
                  <Link to={`/problems/${i.id}`}>
                    <img src={i.previewImgR1.x300} alt="" />
                  </Link>
                  <div className="puzzle-info">
                    <span>Level: {i.rank}</span>
                    { i.whofirst === 'Black First' ? <div className="black-ki-shape" /> : <div className="white-ki-shape" /> }
                  </div>
                </div>
              ))
            )
          }}
        />
        <div className="clearfix" />
      </div>
    );
  }
}

export default Puzzles;