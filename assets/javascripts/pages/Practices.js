import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Link } from 'react-router'

import mainStyles from '../styles/main'
import { fetchPracticeTemplates, fetchPractices } from '../actions/FetchActions'
import { postPractice, postPracticeTemplate } from '../actions/PostActions'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import IconButton from 'material-ui/IconButton'

//material-ui
import ReactPaginate from 'react-paginate'
import { StyleSheet, css } from 'aphrodite'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog'
import Divider from 'material-ui/Divider'

import ContentAdd from 'material-ui/svg-icons/content/add'
import Schedule from 'material-ui/svg-icons/action/schedule'
import Favorite from 'material-ui/svg-icons/action/favorite'
import Description from 'material-ui/svg-icons/action/description'
import Grade from 'material-ui/svg-icons/action/grade'
import List from 'material-ui/svg-icons/action/list'
import { Step, Stepper, StepLabel } from 'material-ui/Stepper'
import {orange500, red500, blue500, grey200, green500} from 'material-ui/styles/colors'

import RankRange from '../presentations/RankRange'

class Practices extends Component {

  PER_PAGE = 10

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

  constructor(props) {
    super(props)
    this.props.dispatch(fetchPracticeTemplates({ page: 1 }))
    this.props.dispatch(fetchPractices({ page: 1, per_page: this.PER_PAGE }))
  }

  handlePageClick(data) {
    let page = data.selected + 1
    this.props.dispatch(fetchPractices({ page: page, per_page: this.PER_PAGE }))
    this.props.dispatch(push(`/practices?page=${page}`))
  }

  handleTemplateOpen() {
    this.setState({templateOpen: true})
  }

  handleTemplateClose() {
    this.setState({templateOpen: false})
  }

  handlePractice(id) {
    let url = `/practices/${id}`
    this.props.dispatch(push(url))
  }

  handlePracticeOpen(id) {
    let template = _.find(this.props.templates.data, {id})
    this.setState({
      life: template.life,
      time: template.time,
      template_id: template.id,
      templateName: template.name,
      puzzleCount: template.puzzle_count,
      rankRange: template.rank_range,
      practiceOpen: true
    })
  }

  handlePracticeClose() {
    this.setState({practiceOpen: false})
  }

  handleCreatePracticeTemplate() {
    this.setState({templateOpen: true})
  }

  handleCreatePractice() {
    this.setState({practiceOpen: true})
  }

  handlePostPracticeTemplate() {
    const { auth } = this.props
    let profile = auth.getProfile()

    this.props.dispatch(postPracticeTemplate({
      name: this.state.templateName,
      template_type: 'approved',
      user_id: profile.user_id,
      life: this.state.life,
      time: this.state.time,
      puzzle_count: this.state.puzzleCount,
      rank_range: this.state.rankRange,
    })).then(() => {
      this.handleTemplateClose()
      this.props.dispatch(fetchPracticeTemplates({ page: 1 }))
    })
  }

  handlePostPractice() {
    const { auth } = this.props
    let profile = auth.getProfile()

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
      let nextUrl = `/practices/${this.props.practice.data.id}`
      this.props.dispatch(push(nextUrl))
    })
  }

  handleRangeChange(range) {
    this.props.dispatch(setRangeFilter(range))
  }

  handlePuzzleCountChange(e) {
    this.setState({ puzzleCount: e.target.value })
  }

  handleTemplateNameChange(e) {
    this.setState({ templateName: e.target.value })
  }

  handleLifeCountChange(e) {
    this.setState({ life: e.target.value })
  }

  handleTimeChange(e) {
    this.setState({ time: e.target.value })
  }

  render() {
    let pagination
    let range = this.props.puzzleFilter['start'] + '-' + this.props.puzzleFilter['end']
    if (this.props.practices.data !== undefined) {
      let pageCount = this.props.practices.data.total_pages
      if (pageCount > 1) {
        pagination = <ReactPaginate previousLabel={"previous"}
                                    nextLabel={"next"}
                                    breakLabel={<a href="">...</a>}
                                    breakClassName={"break-me"}
                                    pageCount={pageCount}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={5}
                                    onPageChange={::this.handlePageClick}
                                    containerClassName={"pagination"}
                                    subContainerClassName={"pages pagination"}
                                    activeClassName={"active"} />
      }
    }
    const templateActions = [
      <FlatButton
        onTouchTap={::this.handleTemplateClose}
        primary={true}
        label="Cancel"
      />,
      <FlatButton
        onTouchTap={::this.handlePostPracticeTemplate}
        primary={true}
        keyboardFocused={true}
        label="Create"
      />,
    ]
    const practiceActions = [
      <FlatButton
        onTouchTap={::this.handlePracticeClose}
        primary={true}
        label="Cancel"
      />,
      <FlatButton
        onTouchTap={::this.handlePostPractice}
        primary={true}
        keyboardFocused={true}
        label="Create"
      />,
    ]
    let templateList = []
    let practiceList = []
    if (this.props.templates.data !== undefined && this.props.templates.data !== null) {
      this.props.templates.data.forEach((i) => {
        templateList.push(
          <Card key={i.id} className={css(styles.card)}
            onClick={this.handlePracticeOpen.bind(this, i.id)}
          >
            <CardMedia className={css(mainStyles.mainImg)} >
            </CardMedia>
            <CardActions className={css(styles.practiceInfo)}>
              <div className={css(styles.name)}>{i.name}</div>
              <Grade className={css(styles.icon, styles.grade)} />
              <span className={css(styles.range)}>{i.rank_range}</span>
              <Favorite className={css(styles.icon, styles.favorite)} />
              <span className={css(styles.life)}>{i.life}</span>
              <Schedule className={css(styles.icon, styles.schedule)}  />
              <span className={css(styles.time)}>{i.time}</span>
              <List className={css(styles.icon, styles.list)} />
              <span className={css(styles.puzzleCount)}>{i.puzzle_count}</span>
            </CardActions>
          </Card>
        )
      })
    }
    if (this.props.practices.data !== undefined && this.props.practices.data !== null) {
      this.props.practices.data.data.forEach((i) => {
        let imgList = []
        i.puzzles.forEach((j, index) => {
          if (index < 6) {
            imgList.push(<img key={j.id} className={css(styles.img)} alt={j.id} src={j.preview_img_r1.x200.url} />)
          }
        })

        practiceList.push(
          <Card key={i.id} className={css(styles.card)}
            onClick={this.handlePractice.bind(this, i.id)}
          >
            <CardActions>
              { imgList }
            </CardActions>
            <CardActions className={css(styles.practiceInfo)}>
              <div className={css(styles.name)}>{i.practice_template.name}</div>
              <Grade className={css(styles.icon, styles.grade)} />
              <span className={css(styles.range)}>{i.rank_range}</span>
              <Favorite className={css(styles.icon, styles.favorite)} />
              <span className={css(styles.life)}>{i.life}</span>
              <Schedule className={css(styles.icon, styles.schedule)}  />
              <span className={css(styles.time)}>{i.time}</span>
              <List className={css(styles.icon, styles.list)} />
              <span className={css(styles.puzzleCount)}>{i.puzzle_count}</span>
            </CardActions>
          </Card>
        )
      })
    }
    return (
      <div style={{marginLeft: this.props.expanded === true ? '235px' : '50px'}} className={css(mainStyles.mainContainer, styles.column)}>
        <div>
          <FloatingActionButton className={css(styles.createBtn)} onClick={::this.handleTemplateOpen}>
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
          onRequestClose={::this.handleTemplateClose}
          autoScrollBodyContent={true}
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
            onChange={::this.handleTimeChange}
            defaultValue="10"
            hintText="TIME LEFT"
            floatingLabelText="TIME LEFT"
          />
          <br />
          <RankRange rankRange={this.props.rangeFilter} handleRangeChange={this.handleRangeChange} ref='range' />
        </Dialog>
        */}
        <Dialog
          title="Create Practice"
          actions={practiceActions}
          modal={false}
          open={this.state.practiceOpen}
          onRequestClose={::this.handlePracticeClose}
          autoScrollBodyContent={true}
        >
          <TextField
            disabled={true}
            defaultValue={this.state.templateName}
            hintText="BASE TEMPLATE"
            floatingLabelText="BASE TEMPLATE NAME"
          />
          <br />
          <TextField
            onChange={::this.handlePuzzleCountChange}
            defaultValue={this.state.puzzleCount}
            hintText="TSUMEGO COUNT"
            floatingLabelText="TSUMEGO COUNT"
          />
          <br />
          <TextField
            onChange={::this.handleLifeCountChange}
            defaultValue={this.state.life}
            hintText="LIFE COUNT"
            floatingLabelText="LIFE COUNT"
          />
          <br />
          <TextField
            onChange={::this.handleTimeChange}
            defaultValue={this.state.time}
            hintText="TIME LEFT"
            floatingLabelText="TIME LEFT"
          />
          <br />
          <RankRange rankRange={this.props.rangeFilter} handleRangeChange={this.handleRangeChange} ref='range' />
        </Dialog>
      </div>
    )
  }

}

const styles = StyleSheet.create({
  column: {
    flexDirection: 'column'
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
    flexDirection: 'row'
  },

  grade: { color: orange500, },

  favorite: { color: red500, },

  schedule: { color: blue500, },

  list: { color: green500, },

  name: { width: '150px', },

  range: { width: '80px', },

  life: { width: '10px', },

  time: { width: '16px', },

  puzzleCount: { width: '16px', },

  createBtn: {
    position: 'fixed',
    zIndex: 100,
    right: '40px',
    bottom: '40px',
  },

  icon: {
    marginLeft: '10px',
  }

})

function select(state) {
  return {
    templates: state.practiceTemplates,
    template: state.practiceTemplate,
    practices: state.practices,
    practice: state.practice,
    puzzles: state.puzzles,
    puzzleFilter: state.puzzleFilter,
    rangeFilter: state.rangeFilter
  }
}

export default connect(select)(Practices)
