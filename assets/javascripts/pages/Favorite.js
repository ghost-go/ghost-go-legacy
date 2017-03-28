import React, { Component, PropTypes as T } from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'

import { fetchFavorites } from '../actions/FetchActions'

import ReactPaginate from 'react-paginate'

import { Link } from 'react-router'

import { StyleSheet, css } from 'aphrodite'
import { List } from 'material-ui/List'

import moment from 'moment'

//import {Row, Col, Dropdown, Glyphicon} from 'react-bootstrap'

class Favorite extends Component {

  state = {
    filterOpen: false,
  }

  static propTypes = {
    location: T.object.isRequired,
    dispatch: T.func.isRequired,
    favorites: T.object.isRequired,
  }

  static contextTypes = {
    auth: T.object.isRequired,
  }

  constructor(props) {
    super(props)
  }

  handleToggle() {
    this.setState({filterOpen: !this.state.filterOpen})
  }

  getFavoriteData(page = 1) {
    const { dispatch } = this.props
    const { auth } = this.context
    let profile = auth.getProfile()
    if (auth.loggedIn()) {
      dispatch(fetchFavorites({
        page: page,
        user_id: profile.user_id,
      }))
    }
  }

  handlePageClick(data) {
    let page = data.selected + 1
    this.getFavoriteData(page)
    this.props.dispatch(push(`/favorites?page=${page}`))
  }

  handleSeeMore() {
    let { query } = this.props.location
    this.setState({filterOpen: false})
    this.getFavoriteData(query.page)
    this.props.dispatch(push(`/favorites?page=${query.page || 1}`))
  }

  componentWillMount() {
    let { query } = this.props.location
    this.getFavoriteData(query.page || 1)
  }

  render() {
    let recordList, pagination, page = 0
    let { query } = this.props.location
    let { favorites } = this.props
    if (query && query.page) {
      page = parseInt(query.page - 1)
    }
    if (favorites.data !== undefined ) {
      if (favorites.data.data.length == 0) {
        recordList = <h3><b>No data.</b></h3>
      } else {
        let pageCount = favorites.data.total_pages
        recordList = favorites.data.data.map((i) =>
          <Link key={`${i.id}`} to={`/puzzles/${i.id}`}>
            <div className={css(style.listBox)}>
              <div className="list-preview-img">
                <img className={css(style.previewImg)} src={i.preview_img_r1.x200.url} />
              </div>
              <div className={css(style.listRight)}>
                <span className={css(style.title)}>{`P-${i.id}(${i.rank})`}</span>
                <span>{i.whofirst}</span>
                <span className={css(style.date)}>{moment(i.created_at).format('YYYY-MM-DD')}</span>
              </div>
            </div>
          </Link>
        )
        if (pageCount > 1) {
          pagination = <ReactPaginate disableInitialCallback={true}
                                      initialPage={page}
                                      previousLabel={'previous'}
                                      nextLabel={'next'}
                                      breakLabel={<a href="">...</a>}
                                      breakClassName={'break-me'}
                                      pageCount={pageCount}
                                      marginPagesDisplayed={2}
                                      pageRangeDisplayed={10}
                                      onPageChange={::this.handlePageClick}
                                      containerClassName={'pagination'}
                                      subContainerClassName={'pages pagination'}
                                      activeClassName={'active'} />
        }
      }
    } else {
      recordList = <h3><b>You must login to access this page.</b></h3>
    }
    return (
      <div>
        <div className={css(styles.favoriteContainer)}>
          <div className={css(styles.right)}>
            <div className={css(styles.listContainer)}>
              <List>
              { recordList }
              </List>
            </div>
            <div className={css(styles.pageContainer)}>
               { pagination }
            </div>
          </div>
        </div>
			</div>
    )
  }
}

const styles = StyleSheet.create({
  centerContainer: {
    justifyContent: 'center',
    flexDirection: 'column',
  },

  favoriteContainer: {
    padding: '10px',
    display: 'flex',
    flexDirection: 'row',
  },

  titleContainer: {
    display: 'flex',
    fontSize: '24px',
    fontWeight: 'bold',
  },

  leftMenu: {
    marginTop: '10px',
    flex: '0 0 250px',
    height: '600px'
  },

  right: {
    marginLeft: '40px',
  },

  icon: {
    fontSize: '38px',
  },

  title: {
    marginLeft: '5px',
    lineHeight: '38px',
  },

  listContainer: {
    display: 'flex',
  },

  pageContainer: {
    display: 'flex',
    justifyContent: 'center',
  }

})

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

function select(state) {
  return {
    favorites: state.favorites,
  }
}

export default connect(select)(Favorite)
