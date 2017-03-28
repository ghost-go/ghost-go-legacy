//react
import React, { Component, PropTypes as T } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import _ from 'lodash'

//material-ui
import {Button, Dropdown, Glyphicon} from 'react-bootstrap'

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

  handleSeeMore(rank, tag) {
    let range = []
    if (rank === 'all' || rank === null) {
      range = ['18k', '9d']
    } else {
      range = rank.split('-')
    }

    if (tag === null) {
      tag = 'all'
    }

    this.setState({filterOpen: false})
    this.props.dispatch(setPuzzleFilter({start: range[0], end: range[1] }))
    this.props.dispatch(setRangeFilter({start: range[0], end: range[1] }))
    this.props.dispatch(setTagFilter(tag))
    this.props.dispatch(fetchPuzzles({
      rank: rank || this.props.rangeFilter,
      tags: tag || this.props.tagFilter,
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
        <div className="page-nav">
          <Dropdown id="filterMenu" title="filter-menu" className="filter" open={this.state.filterOpen} onToggle={::this.handleToggle}>
            <Dropdown.Toggle>
              <Glyphicon className="filter-icon" glyph="filter" />
            </Dropdown.Toggle>
            <Dropdown.Menu className="super-colors">
              <div className="popover-title">Level</div>
              <div className="popover-content">
                <ul className="tags">
                  <li onClick={this.handleSeeMore.bind(this, 'all', this.props.tagFilter)} className={`tag ${this.props.rangeFilter.text === 'all' ? 'active' : ''}`}>ALL</li>
                  <li onClick={this.handleSeeMore.bind(this, '18k-10k', this.props.tagFilter)} className={`tag ${this.props.rangeFilter.text === '18k-10k' ? 'active' : ''}`}>18K-10K</li>
                  <li onClick={this.handleSeeMore.bind(this, '9k-5k', this.props.tagFilter)} className={`tag ${this.props.rangeFilter.text === '9k-5k' ? 'active' : ''}`}>9K-5K</li>
                  <li onClick={this.handleSeeMore.bind(this, '4k-1k', this.props.tagFilter)} className={`tag ${this.props.rangeFilter.text === '4k-1k' ? 'active' : ''}`}>4K-1K</li>
                  <li onClick={this.handleSeeMore.bind(this, '1d-3d', this.props.tagFilter)} className={`tag ${this.props.rangeFilter.text === '1d-3d' ? 'active' : ''}`}>1D-3D</li>
                  <li onClick={this.handleSeeMore.bind(this, '4d-6d', this.props.tagFilter)} className={`tag ${this.props.rangeFilter.text === '4d-6d' ? 'active' : ''}`}>4D-6D</li>
                </ul>
              </div>
              <div className="popover-title">Tags</div>
              <div className="popover-content">
                <ul className="tags">
                  <li className={`tag ${this.props.tagFilter === 'all' ? 'active' : ''}`} onClick={this.handleSeeMore.bind(this, this.props.rangeFilter.text, 'all')}>all</li>
                  { tags.data.map((tag) => <li onClick={this.handleSeeMore.bind(this, this.props.rangeFilter.text, tag.name)} key={tag.id} className={`tag ${this.props.tagFilter === tag.name ? 'active' : ''}`}>{`${tag.name}(${tag.taggings_count})`}</li>)}
                </ul>
              </div>
            </Dropdown.Menu>
          </Dropdown>
          <ul className="page-subnav">
            <li><a title="Level: xxx">{`Level: ${this.props.rangeFilter.text}`}</a></li>
            <li><a title="Tag: xxx">{`Tags: ${this.props.tagFilter}`}</a></li>
            <li>
              <Button
                className='seemore'
                onClick={this.handleSeeMore.bind(this, this.props.rangeFilter.text, this.props.tagFilter)}
                bsStyle="primary">
                See More
              </Button>
            </li>
          </ul>
        </div>
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
