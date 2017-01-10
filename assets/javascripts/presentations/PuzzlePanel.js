import React, { Component, PropTypes } from 'react'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import Rating from 'react-rating'
import SVGIcon from '../presentations/SVGIcon'
import Toggle from 'material-ui/Toggle'
import AnswerBar from '../presentations/AnswerBar'

import { StyleSheet, css } from 'aphrodite'
import RaisedButton from 'material-ui/RaisedButton'
import RankRange from '../presentations/RankRange'

export default class PuzzleList extends Component {

  static propTypes = {
    puzzle: PropTypes.object.isRequired,
    rangeFilter: PropTypes.object.isRequired
  }

  render() {
    let puzzle = this.props.puzzle
    let rightAnswers = []
    let wrongAnswers = []
    if (puzzle != null && puzzle.data != null && puzzle.data.right_answers != null && puzzle.data.wrong_answers != null) {
      puzzle.data.right_answers.forEach((i) => {
        rightAnswers.push(<AnswerBar board={this} key={i.id} id={i.id} steps={i.steps} current={0} total={i.steps_count} up={0} down={0} />)
      })
      puzzle.data.wrong_answers.forEach((i) => {
        wrongAnswers.push(<AnswerBar board={this} key={i.id} id={i.id} steps={i.steps} current={0} total={i.steps_count} up={0} down={0} />)
      })
    }
    return (
      <Card>
        <CardTitle title={`${puzzle.data.whofirst} ${puzzle.data.rank}`} />
        <CardText>
          <div>
            <strong>Number: </strong>
            {`P-${puzzle.data.id}`}
          </div>
        </CardText>
        <CardActions style={{padding: '14px'}}>
          <Rating initialRate={parseFloat(puzzle.data.score)} onChange={this.handleRatingChange.bind(this)}
            empty={<SVGIcon className={css(styles.ratingIcon)} href="#icon-star-empty" />}
            full={<SVGIcon className={css(styles.ratingIcon)} href="#icon-star-full" />}
          />
        </CardActions>
        <CardActions style={{padding: '14px'}}>
          <RaisedButton
            onClick={this.handleReset}
            label="Reset"
            primary={true}
          />
          <RaisedButton
            onClick={this.handleNext.bind(this)}
            label="Next Tsumego"
            secondary={true}
          />
          <RankRange rankRange={this.props.rangeFilter} handleRangeChange={this.handleRangeChange} ref='range' />
        </CardActions>
        <CardActions>
          <div className="addthis_inline_share_toolbox"></div>
          <CardText>
            <Toggle
              className={css(styles.toggle)}
              label="Research Mode"
              onToggle={this.handleResearchMode}
            />
          </CardText>
        </CardActions>
        {
          //<CardText>
            //<Toggle
              //toggled={this.state.answersExpanded}
              //className={css(styles.toggle)}
              //label="Answers"
              //onToggle={this.handleAnswersToggle}
            ///>
          //</CardText>
        }
        <div className={css(styles.answersContainer)}>
          <CardText style={{padding: 0}} expandable={!this.state.answersExpanded}>
            <CardHeader
              title="Right Answers"
              actAsExpander={true}
              showExpandableButton={true}
            />
            { rightAnswers }
            <CardHeader
              title="Wrong Answers"
              actAsExpander={true}
              showExpandableButton={true}
            />
            { wrongAnswers }
          </CardText>
        </div>
      </Card>
    )
  }

}

const styles = StyleSheet.create({

  btnComments: {
    float: 'right'
  },

  puzzlePage: {
    padding: '10px',
    display: 'flex',
    '@media (max-width: 992px)': {
      padding: '0px',
      flexDirection: 'column',
    }
  },

  puzzleContainer: {
    display: 'flex',
  },

  answersContainer: {
    padding: '16px 0px',
    '@media screen and (max-aspect-ratio: 4/3)': {
      padding: '0px'
    },
  },

  puzzleBoard: {
    margin: '0 10px 0 10px',
    '@media (max-width: 992px)': {
      margin: '10px 0 10px 0',
    },
    flex: 'auto',
  },

  puzzleInfo: {
    flex: 'auto',
  },

  toggle: {
    fontSize: '14px',
    maxWidth: '150'
  },

  ratingIcon: {
    width: 28,
    height: 28
  },

})
