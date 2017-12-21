/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ReactPaginate from 'react-paginate';
import { StyleSheet, css } from 'aphrodite';
// import { Card, CardActions, CardMedia } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import ContentAdd from 'material-ui/svg-icons/content/add';
// import Schedule from 'material-ui/svg-icons/action/schedule';
// import Favorite from 'material-ui/svg-icons/action/favorite';
// import Grade from 'material-ui/svg-icons/action/grade';
// import List from 'material-ui/svg-icons/action/list';
import { orange500, red500, blue500, grey200, green500 } from 'material-ui/styles/colors';

import RankRange from '../components/RankRange';
// import mainStyles from '../styles/main';
import { fetchPracticeTemplates, fetchPractices } from '../actions/FetchActions';
import { postPractice, postPracticeTemplate } from '../actions/PostActions';
import { setRangeFilter } from '../actions/Actions';

const styles = StyleSheet.create({
  column: {
    flexDirection: 'column',
  },

  card: {
    cursor: 'pointer',
    ':hover': {
      backgroundColor: grey200,
    },
    margin: '0px 10px 20px 10px',
  },

  img: {
    width: '70px',
    height: '70px',
  },

  practiceInfo: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '16px',
  },

  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },

  grade: { color: orange500 },

  favorite: { color: red500 },

  schedule: { color: blue500 },

  list: { color: green500 },

  name: { width: '150px' },

  range: { width: '80px' },

  life: { width: '10px' },

  time: { width: '16px' },

  puzzleCount: { width: '16px' },

  createBtn: {
    position: 'fixed',
    zIndex: 100,
    right: '40px',
    bottom: '40px',
  },

  icon: {
    marginLeft: '10px',
  },

});

class Practices extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    templates: PropTypes.shape({
      data: PropTypes.arrayOf({}).isRequired,
    }).isRequired,
    auth: PropTypes.shape({}).isRequired,
    practice: PropTypes.shape({
      data: PropTypes.shape({
        id: PropTypes.number.isRequired,
        total_pages: PropTypes.number.isRequired,
      }),
    }).isRequired,
    practices: PropTypes.shape({
      data: PropTypes.shape({
        id: PropTypes.number.isRequired,
        total_pages: PropTypes.number.isRequired,
        data: PropTypes.arrayOf({}).isRequired,
      }),
    }).isRequired,
    rangeFilter: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.props.dispatch(fetchPracticeTemplates({ page: 1 }));
    this.props.dispatch(fetchPractices({ page: 1, per_page: this.PER_PAGE }));

    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleTemplateClose = this.handleTemplateClose.bind(this);
    this.handlePostPracticeTemplate = this.handlePostPracticeTemplate.bind(this);
    this.handlePracticeClose = this.handlePracticeClose.bind(this);
    this.handlePostPractice = this.handlePostPractice.bind(this);
    this.handlePracticeOpen = this.handlePracticeOpen.bind(this);
    this.handleTemplateOpen = this.handleTemplateOpen.bind(this);
    this.handlePuzzleCountChange = this.handlePuzzleCountChange.bind(this);
    this.handleLifeCountChange = this.handleLifeCountChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
  }

  state = {
    templateOpen: false,
    practiceOpen: false,
    life: 2,
    time: 10,
    templateName: 'TEMPLATE NAME 1',
    template_id: null,
    puzzleCount: 10,
    rankRange: '18k-10k',
  }

  PER_PAGE = 10

  handlePageClick(data) {
    const page = data.selected + 1;
    this.props.dispatch(fetchPractices({ page, per_page: this.PER_PAGE }));
    this.props.dispatch(push(`/practices?page=${page}`));
  }

  handleTemplateOpen() {
    this.setState({ templateOpen: true });
  }

  handleTemplateClose() {
    this.setState({ templateOpen: false });
  }

  handlePractice(id) {
    const url = `/practices/${id}`;
    this.props.dispatch(push(url));
  }

  handlePracticeOpen(id) {
    const template = _.find(this.props.templates.data, { id });
    this.setState({
      life: template.life,
      time: template.time,
      template_id: template.id,
      templateName: template.name,
      puzzleCount: template.puzzle_count,
      rankRange: template.rank_range,
      practiceOpen: true,
    });
  }

  handlePracticeClose() {
    this.setState({ practiceOpen: false });
  }

  handleCreatePracticeTemplate() {
    this.setState({ templateOpen: true });
  }

  handleCreatePractice() {
    this.setState({ practiceOpen: true });
  }

  handlePostPracticeTemplate() {
    const { auth } = this.props;
    const profile = auth.getProfile();

    this.props.dispatch(postPracticeTemplate({
      name: this.state.templateName,
      template_type: 'approved',
      user_id: profile.user_id,
      life: this.state.life,
      time: this.state.time,
      puzzle_count: this.state.puzzleCount,
      rank_range: this.state.rankRange,
    })).then(() => {
      this.handleTemplateClose();
      this.props.dispatch(fetchPracticeTemplates({ page: 1 }));
    });
  }

  handlePostPractice() {
    const { auth } = this.props;
    const profile = auth.getProfile();

    this.props.dispatch(postPractice({
      name: this.state.templateName,
      practice_type: 'approved',
      user_id: profile.user_id,
      practice_template_id: this.state.template_id,
      life: this.state.life,
      time: this.state.time,
      puzzle_count: this.state.puzzleCount,
      rank_range: this.state.rankRange,
    })).then(() => {
      const nextUrl = `/practices/${this.props.practice.data.id}`;
      this.props.dispatch(push(nextUrl));
    });
  }

  handleRangeChange(range) {
    this.props.dispatch(setRangeFilter(range));
  }

  handlePuzzleCountChange(e) {
    this.setState({ puzzleCount: e.target.value });
  }

  handleTemplateNameChange(e) {
    this.setState({ templateName: e.target.value });
  }

  handleLifeCountChange(e) {
    this.setState({ life: e.target.value });
  }

  handleTimeChange(e) {
    this.setState({ time: e.target.value });
  }

  render() {
    let pagination;
    if (this.props.practices.data !== undefined) {
      const pageCount = this.props.practices.data.total_pages;
      if (pageCount > 1) {
        pagination = (<ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={<span>...</span>}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />);
      }
    }
    const templateActions = [
      <FlatButton
        onTouchTap={this.handleTemplateClose}
        primary
        label="Cancel"
      />,
      <FlatButton
        onTouchTap={this.handlePostPracticeTemplate}
        primary
        keyboardFocused
        label="Create"
      />,
    ];
    const practiceActions = [
      <FlatButton
        onTouchTap={this.handlePracticeClose}
        primary
        label="Cancel"
      />,
      <FlatButton
        onTouchTap={this.handlePostPractice}
        primary
        keyboardFocused
        label="Create"
      />,
    ];
    const templateList = [];
    const practiceList = [];
    // TODO: handlePracticeOpen need be refactored
    // if (this.props.templates.data !== undefined && this.props.templates.data !== null) {
    //   this.props.templates.data.forEach((i) => {
    //     templateList.push(
    //       <Card
    //         key={i.id} className={css(styles.card)}
    //         onClick={this.handlePracticeOpen.bind(this, i.id)}
    //       >
    //         <CardMedia className={css(mainStyles.mainImg)} />
    //         <CardActions className={css(styles.practiceInfo)}>
    //           <div className={css(styles.name)}>{i.name}</div>
    //           <Grade className={css(styles.icon, styles.grade)} />
    //           <span className={css(styles.range)}>{i.rank_range}</span>
    //           <Favorite className={css(styles.icon, styles.favorite)} />
    //           <span className={css(styles.life)}>{i.life}</span>
    //           <Schedule className={css(styles.icon, styles.schedule)} />
    //           <span className={css(styles.time)}>{i.time}</span>
    //           <List className={css(styles.icon, styles.list)} />
    //           <span className={css(styles.puzzleCount)}>{i.puzzle_count}</span>
    //         </CardActions>
    //       </Card>,
    //     );
    //   });
    // }
    // if (this.props.practices.data !== undefined && this.props.practices.data !== null) {
    //   this.props.practices.data.data.forEach((i) => {
    //     const imgList = [];
    //     i.puzzles.forEach((j, index) => {
    //       if (index < 6) {
    //         imgList.push(
    //         <img key={j.id} className={css(styles.img)}
    //         alt={j.id} src={j.preview_img_r1.x200.url}
    //         />);
    //       }
    //     });

    //     practiceList.push(
    //       <Card
    //         key={i.id} className={css(styles.card)}
    //         onClick={this.handlePractice.bind(this, i.id)}
    //       >
    //         <CardActions>
    //           { imgList }
    //         </CardActions>
    //         <CardActions className={css(styles.practiceInfo)}>
    //           <div className={css(styles.name)}>{i.practice_template.name}</div>
    //           <Grade className={css(styles.icon, styles.grade)} />
    //           <span className={css(styles.range)}>{i.rank_range}</span>
    //           <Favorite className={css(styles.icon, styles.favorite)} />
    //           <span className={css(styles.life)}>{i.life}</span>
    //           <Schedule className={css(styles.icon, styles.schedule)} />
    //           <span className={css(styles.time)}>{i.time}</span>
    //           <List className={css(styles.icon, styles.list)} />
    //           <span className={css(styles.puzzleCount)}>{i.puzzle_count}</span>
    //         </CardActions>
    //       </Card>,
    //     );
    //   });
    // }
    return (
      <div>
        <div>
          <FloatingActionButton className={css(styles.createBtn)} onClick={this.handleTemplateOpen}>
            <ContentAdd />
          </FloatingActionButton>
          <div className={css(styles.cardContainer)}>
            {/*
            <Card expanded={true}>
              <CardHeader
                title="RANKS"
                actAsExpander={true}
                showExpandableButton={true}
              />
            </Card>
            <Card expanded={true}>
              <CardHeader
                title="TEMPLATE"
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardText expandable={true}>
                No Tags(Not Open)
              </CardText>
            </Card>
            */}
            { practiceList }
          </div>
          <div>
            { pagination }
          </div>
        </div>
        <Dialog
          title="Choose Template"
          actions={templateActions}
          modal={false}
          open={this.state.templateOpen}
          onRequestClose={this.handleTemplateClose}
          autoScrollBodyContent
        >
          <div className={css(styles.cardContainer)}>
            { templateList }
          </div>
          {/*
          <RaisedButton
            onTouchTap={::this.handleCreatePracticeTemplate}
            label="Create Practice Template"
            secondary={true}
           />
           */}
        </Dialog>
        {/*
        <Dialog
          title="Create Practice Template"
          actions={templateActions}
          modal={false}
          open={this.state.templateOpen}
          onRequestClose={::this.handleTemplateClose}
          autoScrollBodyContent={true}
        >
          <TextField
            onChange={::this.handleTemplateNameChange}
            defaultValue="TEMPLATE NAME 1"
            hintText="TEMPLATE NAME"
            floatingLabelText="TEMPLATE NAME"
          />
          <br />
          <TextField
            onChange={::this.handlePuzzleCountChange}
            defaultValue="10"
            hintText="TSUMEGO COUNT"
            floatingLabelText="TSUMEGO COUNT"
          />
          <br />
          <TextField
            onChange={::this.handleLifeCountChange}
            defaultValue="1"
            hintText="LIFE COUNT"
            floatingLabelText="LIFE COUNT"
          />
          <br />
          <TextField
            onChange={this.handleTimeChange}
            defaultValue="10"
            hintText="TIME LEFT"
            floatingLabelText="TIME LEFT"
          />
          <br />
          <RankRange rankRange={this.props.rangeFilter}
            handleRangeChange={this.handleRangeChange} ref='range' />
        </Dialog>
        */}
        <Dialog
          title="Create Practice"
          actions={practiceActions}
          modal={false}
          open={this.state.practiceOpen}
          onRequestClose={this.handlePracticeClose}
          autoScrollBodyContent
        >
          <TextField
            disabled
            defaultValue={this.state.templateName}
            hintText="BASE TEMPLATE"
            floatingLabelText="BASE TEMPLATE NAME"
          />
          <br />
          <TextField
            onChange={this.handlePuzzleCountChange}
            defaultValue={this.state.puzzleCount}
            hintText="TSUMEGO COUNT"
            floatingLabelText="TSUMEGO COUNT"
          />
          <br />
          <TextField
            onChange={this.handleLifeCountChange}
            defaultValue={this.state.life}
            hintText="LIFE COUNT"
            floatingLabelText="LIFE COUNT"
          />
          <br />
          <TextField
            onChange={this.handleTimeChange}
            defaultValue={this.state.time}
            hintText="TIME LEFT"
            floatingLabelText="TIME LEFT"
          />
          <br />
          { /* ref="range" */ }
          <RankRange
            rankRange={this.props.rangeFilter}
            handleRangeChange={this.handleRangeChange}
          />
        </Dialog>
      </div>
    );
  }
}

function select(state) {
  return {
    templates: state.practiceTemplates,
    template: state.practiceTemplate,
    practices: state.practices,
    practice: state.practice,
    puzzles: state.puzzles,
    puzzleFilter: state.puzzleFilter,
    rangeFilter: state.rangeFilter,
  };
}

export default connect(select)(Practices);
