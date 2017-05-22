import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * ## Constants
 *
 */
const BASE_SHIFT = 0;
const TITLE_SHIFT = 1;
const TITLES = {
  prev: '\u0048',
  prevSet: '...',
  first: 'First',
  nextSet: '...',
  next: '\u00BB',
  last: 'Next',
};

function range(start, end) {
  const res = [];
  for (let i = start; i < end; i++) {
    res.push(i);
  }
  return res;
}

const Page = (props) => {
  if (props.isHidden) return null;
  const baseCss = props.className ? `${props.className} ` : '';
  const css = baseCss + (props.isActive ? 'active' : '') + (props.isDisabled ? 'disabled' : '');
  return (
    <li key={this.props.key} className={css}>
      <a onClick={this.props.onClick}>{this.props.children}</a>
    </li>
  );
};
Page.propTypes = {
  isHidden: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
};

export default class Pagination extends Component {
  static propTypes = {
    current: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    titles: PropTypes.arrayOf({}).isRequired,
    // visiblePages: PropTypes.number.isRequired,

    onPageChanged: PropTypes.func.isRequired,
    // onPageSizeChanged: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.handleFirstPage = this.handleFirstPage.bind(this);
    this.handleLastPage = this.handleLastPage.bind(this);
    this.handleNextPage = this.handleNextPage.bind(this);
    this.handlePreviousPage = this.handlePreviousPage.bind(this);
    this.handleMorePrevPages = this.handleMorePrevPages.bind(this);
    this.handleMoreNextPages = this.handleMoreNextPages.bind(this);

    this.calcBlocks = this.calcBlocks.bind(this);
    this.handlePageChanged = this.handlePageChanged.bind(this);
    this.getTitles = this.getTitles.bind(this);
  }

  getTitles(key) {
    const pTitles = this.props.titles || {};
    return pTitles[key] || TITLES[key];
  }

  /**
   * handle function
   *
   */
  handleFirstPage() {
    if (this.isPrevDisabled()) return;
    this.handlePageChanged(BASE_SHIFT);
  }

  handlePreviousPage() {
    if (this.isPrevDisabled()) return;
    this.handlePageChanged(this.props.current - TITLE_SHIFT);
  }

  handleNextPage() {
    if (this.isNextDisabled()) return;
    this.handlePageChanged(this.props.current + TITLE_SHIFT);
  }

  handleLastPage() {
    if (this.isNextDisabled()) return;
    this.handlePageChanged(this.props.total - TITLE_SHIFT);
  }

  handleMorePrevPages() {
    const blocks = this.calcBlocks();
    this.handlePageChanged((blocks.current * blocks.size) - TITLE_SHIFT);
  }

  handleMoreNextPages() {
    const blocks = this.calcBlocks();
    this.handlePageChanged((blocks.current + TITLE_SHIFT) * blocks.size);
  }

  handlePageChanged(el) {
    const handler = this.props.onPageChanged;
    if (handler) handler(el);
  }

  calcBlocks() {
    const props = this.props;
    const total = props.total;
    const blockSize = props.visiblePages;
    const current = props.current + TITLE_SHIFT;
    const blocks = Math.ceil(total / blockSize);
    const currBlock = Math.ceil(current / blockSize) - TITLE_SHIFT;

    return {
      total: blocks,
      current: currBlock,
      size: blockSize,
    };
  }

  isPrevDisabled() {
    return this.props.current <= BASE_SHIFT;
  }

  isNextDisabled() {
    return this.props.current >= (this.props.total - TITLE_SHIFT);
  }

  isPrevMoreHidden() {
    const blocks = this.calcBlocks();
    return (blocks.total === TITLE_SHIFT)
           || (blocks.current === BASE_SHIFT);
  }

  isNextMoreHidden() {
    const blocks = this.calcBlocks();
    return (blocks.total === TITLE_SHIFT)
           || (blocks.current === (blocks.total - TITLE_SHIFT));
  }

  visibleRange() {
    const blocks = this.calcBlocks();
    const start = blocks.current * blocks.size;
    const delta = this.props.total - start;
    const end = start + ((delta > blocks.size) ? blocks.size : delta);
    return [start + TITLE_SHIFT, end + TITLE_SHIFT];
  }

   /**
     * ### renderPages()
     * Renders block of pages' buttons with numbers.
     * @param {Number[]} range - pair of [start, from], `from` - not inclusive.
     * @return {React.Element[]} - array of React nodes.
     */
  renderPages(pair) {
    const self = this;
    return range(pair[0], pair[1]).map((el) => {
      const current = el - TITLE_SHIFT;
      const onClick = self.handlePageChanged.bind(null, current);
      const isActive = (self.props.current === current);

      return (
        <Page
          key={`page-${current}`} isActive={isActive}
          className="btn-numbered-page"
          onClick={onClick}
        >{el}</Page>
      );
    });
  }

  render() {
    const titles = this.getTitles;

    return (
      <nav>
        <ul className="pagination">
          <Page
            className="btn-first-page"
            key="btn-first-page"
            isDisabled={this.isPrevDisabled()}
            onClick={this.handleFirstPage}
          >{titles('first')}</Page>

          <Page
            className="btn-prev-page"
            key="btn-prev-page"
            isDisabled={this.isPrevDisabled()}
            onClick={this.handlePreviousPage}
          >{titles('prev')}</Page>

          <Page
            className="btn-prev-more"
            key="btn-prev-more"
            isHidden={this.isPrevMoreHidden()}
            onClick={this.handleMorePrevPages}
          >{titles('prevSet')}</Page>

          {this.renderPages(this.visibleRange())}

          <Page
            className="btn-next-more"
            key="btn-next-more"
            isHidden={this.isNextMoreHidden()}
            onClick={this.handleMoreNextPages}
          >{titles('nextSet')}</Page>

          <Page
            className="btn-next-page"
            key="btn-next-page"
            isDisabled={this.isNextDisabled()}
            onClick={this.handleNextPage}
          >{titles('next')}</Page>

          <Page
            className="btn-last-page"
            key="btn-last-page"
            isDisabled={this.isNextDisabled()}
            onClick={this.handleLastPage}
          >{titles('last')}</Page>
        </ul>
      </nav>
    );
  }
}

