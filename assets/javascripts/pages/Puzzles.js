//react
import React, { Component, PropTypes as T } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import _ from 'lodash'
import FilterBar from '../components/FilterBar'

//material-ui
import {Button} from 'react-bootstrap'

//internal component
import { fetchPuzzles, fetchTags } from '../actions/FetchActions'
import { setPuzzleFilter, setRangeFilter, setTagFilter } from '../actions/Actions'

//external component
import { StyleSheet, css } from 'aphrodite'

class Puzzles extends Component {

  static propTypes = {
    tags: T.object.isRequired,
    puzzles: T.object.isRequired,
    rangeFilter: T.object.isRequired,
    puzzleFilter: T.object.isRequired,
    tagFilter: T.string.isRequired,
    dispatch: T.func.isRequired,
    location: T.object.isRequired,
  }

  state = {
    tipsOpen: false,
    isLoading: false,
    filterOpen: false,
  }

  constructor(props) {
    super(props)

    this.handleSeeMore = this.handleSeeMore.bind(this)
  }

  handleToggle() {
    this.setState({filterOpen: !this.state.filterOpen})
  }

  handleSeeMore(filter, val) {
    let range = []
    const { dispatch, rangeFilter, tagFilter } = this.props
    this.setState({filterOpen: false})
    if (filter === 'rangeFilter') {
      if (val === 'all' || val === null) {
        range = ['18k', '9d']
      } else {
        range = val.split('-')
      }
      dispatch(setPuzzleFilter({start: range[0], end: range[1] }))
      dispatch(setRangeFilter({start: range[0], end: range[1] }))
    } else if (filter === 'tagFilter') {
      if (val === null) {
        val = 'all'
      }
      dispatch(setTagFilter(val))
    }

    dispatch(fetchPuzzles({
      rank: filter === 'rangeFilter' ? val : rangeFilter.text,
      tags: filter === 'tagFilter' ? val : tagFilter,
    }))
  }

  handleTips() {
    this.setState({
      tipsOpen: true
    })
  }

  componentDidMount() {
    let { query } = this.props.location
    this.props.dispatch(fetchTags({}))
    this.props.dispatch(fetchPuzzles({
      page: query.page,
      rank: query.rank
    }))
  }

  render() {
    const { puzzles, tags } = this.props
    if (_.isNil(puzzles) || _.isNil(tags) || _.isNil(tags.data)) return null

    let puzzlesCards = []
    if (!puzzles.isFetching && puzzles.data != null && puzzles.data.puzzles.length > 0) {
      puzzles.data.puzzles.forEach((i) => {
        puzzlesCards.push(
          <div key={i.id} className='puzzle-card'>
            <Link to={`/puzzles/${i.id}`}>
              <img src={i.preview_img_r1.x300.url} />
            </Link>
            <div className='puzzle-info'>
              <span>Level: {i.rank}</span>
              { i.whofirst === 'Black First' ?  <div className="black-ki-shape"></div> : <div className="white-ki-shape"></div> }
            </div>
          </div>
        )
      })
    }
    else {
      puzzlesCards =
        <div className={css(styles.loading)}>
          <i className="fa fa-spinner fa-pulse fa-fw"></i>
        </div>
    }
    return (
      <div>
        <FilterBar data={[{
          name: 'Level',
          tags: ['all', '18k-10k', '9k-5K', '4k-1k', '1d-3d', '4d-6d'],
          filterName: 'rangeFilter',
          filterVal: this.props.rangeFilter.text,
          handleSeeMore: this.handleSeeMore,
        }, {
          name: 'Tags',
          tags: ['all', ...tags.data.map(tag => tag.name)],
          filterName: 'tagFilter',
          filterVal: this.props.tagFilter,
          handleSeeMore: this.handleSeeMore,
        }]}>
          <li key="seemore">
            <Button
              className='seemore'
              onClick={this.handleSeeMore.bind(this, this.props.rangeFilter.text, this.props.tagFilter)}
              bsStyle="primary">
              See More
            </Button>
          </li>
        </FilterBar>
        <div className={css(styles.puzzleContent)}>
          { puzzlesCards }
        </div>
        <div className='clearfix'></div>
      </div>
    )
  }
}

const styles = StyleSheet.create({

  loading: {
    width: '100px',
    height: '100px',
    paddingTop: '100px',
    fontSize: '100px',
    margin: '0 auto',
  },

})

function select(state) {
  return {
    puzzles: state.puzzles,
    puzzleFilter: state.puzzleFilter,
    rangeFilter: state.rangeFilter,
    tagFilter: state.tagFilter,
    tags: state.tags,
  }
}

export default connect(select)(Puzzles)
