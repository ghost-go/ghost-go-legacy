import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { push } from 'react-router-redux';
import _ from 'lodash';
import { StyleSheet, css } from 'aphrodite';

import { fetchKifus, fetchTopPlayers } from '../actions/FetchActions';
import { setKifuFilter, setToolbarHidden } from '../actions/Actions';
import FilterBar from '../components/FilterBar';

const styles = StyleSheet.create({
  loading: {
    fontSize: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    margin: '0 auto',
  },
});

class Kifus extends Component {
  static propTypes = {
    kifus: PropTypes.shape({
      data: PropTypes.shape({
        total_pages: PropTypes.number,
      }),
    }).isRequired,
    players: PropTypes.shape({}).isRequired,
    location: PropTypes.shape({
      query: PropTypes.shape({
        page: PropTypes.string,
      }),
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
    kifuFilter: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);

    this.handleSeeMore = this.handleSeeMore.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  state = {
    // isLoading: false,
    filterOpen: false,
  }

  componentWillMount() {
    const query = new URLSearchParams(this.props.location);
    this.props.dispatch(fetchKifus({
      page: query.get('page'),
      player: this.state.kifuFilter,
      per_page: 24,
    }));

    this.props.dispatch(fetchTopPlayers(10));
    this.props.dispatch(setToolbarHidden(true));
    this.getRecordData();
  }

  getRecordData(page = 1) {
    this.props.dispatch(fetchKifus({ page }));
  }

  handleToggle() {
    this.setState({ filterOpen: !this.state.filterOpen });
  }

  handlePageClick(data) {
    const page = data.selected + 1;
    this.getRecordData(page);
    this.props.dispatch(push(`/kifus?page=${page}`));
  }

  handlePageChanged(newPage) {
    this.setState({ current: newPage }, () => {
      this.props.dispatch(fetchKifus(this.state.current + 1));
    });
  }

  handleSeeMore(filter, val) {
    this.setState({ filterOpen: false });
    this.props.dispatch(setKifuFilter(val || this.props.kifuFilter));
    this.props.dispatch(fetchKifus({
      player: val || this.props.kifuFilter,
    }));
  }

  render() {
    const { kifus, players } = this.props;
    if (_.isNil(kifus) || _.isNil(players.data)) return null;
    let kifuCards = [];
    let pagination;
    let page = 0;
    const query = new URLSearchParams(this.props.location);
    if (query && query.get('page')) {
      page = parseInt(query.page - 1, 10);
    }
    if (this.props.kifus.data !== undefined) {
      const pageCount = this.props.kifus.data.total_pages;
      if (pageCount > 1) {
        pagination = (
          <ReactPaginate
            disableInitialCallback
            initialPage={page}
            previousLabel="previous"
            nextLabel="next"
            breakLabel={<span>...</span>}
            breakClassName="break-me"
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName="pagination"
            subContainerClassName="pages pagination"
            activeClassName="active"
          />
        );
      }
    }
    if (!kifus.isFetching && kifus.data != null) {
      kifus.data.data.forEach((i) => {
        const kifuCard = (
          <div key={i.id} className="kifu-card">
            <Link to={`/kifus/${i.id}`}>
              <img src={i.preview_img.x300.url} alt="" />
            </Link>
            <div className="kifu-info">
              <span>{i.player_b.en_name} <b>VS</b> {i.player_w.en_name}</span>
              <br />
              <span>{`Result: ${i.result}`}</span>
              <br />
              <span>{`Date: ${i.short_date}`}</span>
            </div>
          </div>
        );
        kifuCards.push(kifuCard);
      });
    } else {
      kifuCards = (
        <div className={css(styles.loading)}>
          <i className="fa fa-spinner fa-pulse fa-fw" />
        </div>
      );
    }
    return (
      <div>
        <FilterBar
          data={[{
            name: 'Player',
            tags: ['all', ...players.data.map(player => player.en_name)],
            filterName: 'playerFilter',
            filterVal: this.props.kifuFilter,
            handleSeeMore: this.handleSeeMore,
          }]}
        />
        <div className={css(styles.puzzleContent)}>
          { kifuCards }
        </div>
        <div className="clearfix" />
        <div>
          { pagination }
        </div>
        <div className="clearfix" />
      </div>
    );
  }
}

function select(state) {
  return {
    kifus: state.kifus,
    players: state.players,
    kifuFilter: state.kifuFilter,
  };
}

export default connect(select)(Kifus);
