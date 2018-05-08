import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { StyleSheet, css } from 'aphrodite';
import Remove from 'material-ui/svg-icons/content/remove';

import RankList from './RankList';

import { setRangeFilter } from '../actions/Actions';

// const styles = StyleSheet.create({

//   rangeContainer: {
//     alignItems: 'center',
//   },

//   remove: {
//     height: '50px',
//     margin: '0 15px',
//   },

//   customWidth: {
//     width: 60,
//   },
// });

function mapStateToProps(state) {
  return {
    rangeFilter: state.rangeFilter,
  };
}

@connect(mapStateToProps)
export default class RankRange extends Component {
  static propTypes = {
    // rankRange: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    rangeFilter: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);

    this.handleRangeStart = this.handleRangeStart.bind(this);
    this.handleRangeEnd = this.handleRangeEnd.bind(this);
  }

  handleRangeStart(rank) {
    const rangeEnd = this.props.rangeFilter === 'all' ? '9d' : this.props.rangeFilter.split('-')[1];
    this.props.dispatch(setRangeFilter(`${rank}-${rangeEnd}`));
  }

  handleRangeEnd(rank) {
    const rangeStart = this.props.rangeFilter === 'all' ? '18k' : this.props.rangeFilter.split('-')[0];
    this.props.dispatch(setRangeFilter(`${rangeStart}-${rank}`));
  }

  render() {
    const { rangeFilter } = this.props;
    let rangeStart;
    let rangeEnd;
    if (rangeFilter === 'all') {
      rangeStart = '18k';
      rangeEnd = '9d';
    } else {
      [rangeStart, rangeEnd] = rangeFilter.split('-');
    }
    return (
      <div>
        <RankList
          rank={rangeStart}
          floatingLabelText="FROM"
          onChange={this.handleRangeStart}
        />
        <Remove style={{ height: '50px', margin: '0 10px' }} />
        <RankList
          rank={rangeEnd}
          floatingLabelText="TO"
          onChange={this.handleRangeEnd}
        />
      </div>
    );
  }
}
