import React, { Component, PropTypes } from 'react'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import Rating from 'react-rating'
import SVGIcon from '../presentations/SVGIcon'
import { postRating } from '../actions/PostActions'
import Toggle from 'material-ui/Toggle'
import AnswerBar from '../presentations/AnswerBar'

import { StyleSheet, css } from 'aphrodite'
import RaisedButton from 'material-ui/RaisedButton'
import RankRange from '../presentations/RankRange'

export default class PuzzlePanel extends Component {

  static propTypes = {
    puzzle: PropTypes.object.isRequired,
    rangeFilter: PropTypes.object.isRequired,
    className: PropTypes.object,
    params: PropTypes.object,
    dispatch: PropTypes.object,
    auth: PropTypes.object,
  }

  constructor(props) {
    super(props)

    this.state = {
      answersExpanded: true,
    }

  }

  handleRatingChange(rate) {
    const { auth } = this.props
    let profile = auth.getProfile()
    if (auth.loggedIn()) {
      let { id } = this.props.params
      this.props.dispatch(postRating({
        ratable_id: id,
        ratable_type: 'Puzzle',
        score: rate,
        user_id: profile.user_id
      })).then((promise) => {
        if (promise.type === 'POST_RATING_SUCCESS') {
          this.setState({
            open: true,
            score: rate,
            ratingInfo: promise.payload.data.message || 'Thanks for you rating!'
          })
        }
      })
    } else {
      auth.login()
    }
  }


  render() {
    let puzzle = this.props.puzzle
    if (puzzle === undefined) return null
    let rightAnswers = []
    let wrongAnswers = []
    if (puzzle != null && puzzle.right_answers != null && puzzle.wrong_answers != null) {
      puzzle.right_answers.forEach((i) => {
        rightAnswers.push(<AnswerBar board={this} key={i.id} id={i.id} steps={i.steps} current={0} total={i.steps_count} up={0} down={0} />)
      })
      puzzle.wrong_answers.forEach((i) => {
        wrongAnswers.push(<AnswerBar board={this} key={i.id} id={i.id} steps={i.steps} current={0} total={i.steps_count} up={0} down={0} />)
      })
    }
    return (
      <Card className={this.props.className}>
        <CardTitle title={`${puzzle.whofirst} ${puzzle.rank}`} />
        <CardText>
          <div>
            <strong>Number: </strong>
            {`P-${puzzle.id}`}
          </div>
        </CardText>
        <CardActions style={{padding: '14px'}}>
          <Rating initialRate={parseFloat(puzzle.score)} onChange={::this.handleRatingChange}
            empty={<SVGIcon className={css(styles.ratingIcon)} href="#icon-star-empty" />}
            full={<SVGIcon className={css(styles.ratingIcon)} href="#icon-star-full" />}
          />
        </CardActions>
        <CardActions style={{padding: '14px'}}>
          <RaisedButton
            onClick={this.props.handleReset}
            label="Reset"
            primary={true}
          />
          {
            () => {
              if (this.props.showNext === true) {
                return (
                  <div>
                    <RaisedButton
                      onClick={this.props.handleNext}
                      label="Next Tsumego"
                      secondary={true}
                    />
                    <RankRange rankRange={this.props.rangeFilter} handleRangeChange={this.props.handleRangeChange} ref='range' />
                  </div>
                )
              }
            }
          }
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

  answersContainer: {
    padding: '0px',
    '@media screen and (max-aspect-ratio: 4/3)': {
      padding: '0px',
    },
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
