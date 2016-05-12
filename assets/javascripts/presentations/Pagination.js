import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router'

/**
 * ## Constants
 *
 */
const BASE_SHIFT = 0
const TITLE_SHIFT = 1
const TITLES = {
  prev: '\u0048',
  prevSet: '...',
  first: 'First',
  nextSet: '...',
  next: '\u00BB',
  last: 'Next',
}

export default class Pagination extends Component {
  constructor(props) {
    super(props)

    this.handleFirstPage = this.handleFirstPage.bind(this)
    this.handleLastPage = this.handleLastPage.bind(this)
    this.handleNextPage = this.handleNextPage.bind(this)
    this.handlePreviousPage = this.handlePreviousPage.bind(this)
    this.handleMorePrevPages = this.handleMorePrevPages.bind(this)
    this.handleMoreNextPages = this.handleMoreNextPages.bind(this)

    this.calcBlocks = this.calcBlocks.bind(this)
    this.handlePageChanged = this.handlePageChanged.bind(this)
    this.getTitles = this.getTitles.bind(this)
  }

  /**
   * handle function
   *
   */
  handleFirstPage() {
    if ( this.isPrevDisabled() ) return
    this.handlePageChanged( BASE_SHIFT )
  }

  handlePreviousPage() {
    if ( this.isPrevDisabled() ) return
    this.handlePageChanged( this.props.current - TITLE_SHIFT )
  }

  handleNextPage() {
    if ( this.isNextDisabled() ) return
    this.handlePageChanged( this.props.current + TITLE_SHIFT )
  }

  handleLastPage() {
    if ( this.isNextDisabled() ) return
    this.handlePageChanged( this.props.total - TITLE_SHIFT )
  }

  handleMorePrevPages() {
    let blocks = this.calcBlocks()
    this.handlePageChanged( blocks.current * blocks.size - TITLE_SHIFT )
  }

  handleMoreNextPages() {
    let blocks = this.calcBlocks()
    this.handlePageChanged( (blocks.current + TITLE_SHIFT) * blocks.size )
  }

  handlePageChanged(el) {
    let handler = this.props.onPageChanged
    if ( handler ) handler( el )
  }

  calcBlocks() {
    let props = this.props
    let total = props.total
    let blockSize = props.visiblePages
    let current = props.current + TITLE_SHIFT
    let blocks = Math.ceil( total / blockSize )
    let currBlock = Math.ceil( current / blockSize ) - TITLE_SHIFT

    return {
      total: blocks,
      current: currBlock,
      size: blockSize,
    }
  }

  isPrevDisabled() {
    return this.props.current <= BASE_SHIFT
  }

  isNextDisabled() {
    return this.props.current >= ( this.props.total - TITLE_SHIFT )
  }

  isPrevMoreHidden() {
    let blocks = this.calcBlocks()
    return ( blocks.total === TITLE_SHIFT )
           || ( blocks.current === BASE_SHIFT)
  }

  isNextMoreHidden() {
    let blocks = this.calcBlocks()
    return ( blocks.total === TITLE_SHIFT )
           || ( blocks.current === (blocks.total - TITLE_SHIFT))
  }

  visibleRange() {
    let blocks  = this.calcBlocks()
    let start   = blocks.current * blocks.size
    let delta   = this.props.total - start
    let end     = start + ( (delta > blocks.size) ? blocks.size : delta );
    return [ start + TITLE_SHIFT, end + TITLE_SHIFT ];
  }

  getTitles( key ) {
    let pTitles = this.props.titles || {};
    return pTitles[ key ] || TITLES[ key ];
  }


  render() {

    let titles = this.getTitles;

    return (
        <nav>
            <ul className="pagination">
                <Page className="btn-first-page"
                      key="btn-first-page"
                      isDisabled={this.isPrevDisabled()}
                      onClick={this.handleFirstPage}>{titles('first')}</Page>

                <Page className="btn-prev-page"
                      key="btn-prev-page"
                      isDisabled={this.isPrevDisabled()}
                      onClick={this.handlePreviousPage}>{titles('prev')}</Page>

                <Page className="btn-prev-more"
                      key="btn-prev-more"
                      isHidden={this.isPrevMoreHidden()}
                      onClick={this.handleMorePrevPages}>{titles('prevSet')}</Page>

                {this.renderPages( this.visibleRange() )}

                <Page className="btn-next-more"
                       key="btn-next-more"
                      isHidden={this.isNextMoreHidden()}
                      onClick={this.handleMoreNextPages}>{titles('nextSet')}</Page>

                <Page className="btn-next-page"
                      key="btn-next-page"
                      isDisabled={this.isNextDisabled()}
                      onClick={this.handleNextPage}>{titles('next')}</Page>

                <Page className="btn-last-page"
                      key="btn-last-page"
                      isDisabled={this.isNextDisabled()}
                      onClick={this.handleLastPage}>{titles('last')}</Page>
            </ul>
        </nav>
    )
  }

   /**
     * ### renderPages()
     * Renders block of pages' buttons with numbers.
     * @param {Number[]} range - pair of [start, from], `from` - not inclusive.
     * @return {React.Element[]} - array of React nodes.
     */
  renderPages( pair ) {
    let self = this
    return range( pair[0], pair[1] ).map(function ( el, idx ) {
        let current = el - TITLE_SHIFT
        let onClick = self.handlePageChanged.bind(null, current)
        let isActive = (self.props.current === current);

        return (
          <Page key={idx} isActive={isActive}
                          className="btn-numbered-page"
                          onClick={onClick}>{el}</Page>
        )
    });
  }
}

Pagination.propTypes = {
  current:               React.PropTypes.number.isRequired,
  total:                 React.PropTypes.number.isRequired,
  visiblePages:          React.PropTypes.number.isRequired,
  titles:                React.PropTypes.object,

  onPageChanged:         React.PropTypes.func,
  onPageSizeChanged:     React.PropTypes.func
}



function range ( start, end ) {
  let res = []
  for ( let i = start; i < end; i++ ) {
    res.push( i )
  }
  return res
}

class Page extends Component {
  render() {
    let props = this.props
    if ( props.isHidden ) return null
    let baseCss = props.className ? props.className + ' ' : ''
    let css = baseCss + (props.isActive ? 'active' : '') + (props.isDisabled ? 'disabled' : '')

    return (
      <li key={this.props.key} className={css}>
        <a onClick={this.props.onClick}>{this.props.children}</a>
      </li>
    )
  }
}
