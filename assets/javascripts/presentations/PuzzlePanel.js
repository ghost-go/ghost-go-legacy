import React, { Component, PropTypes as T } from 'react'
import { postRating, postFavorite } from '../actions/PostActions'
import Toggle from 'material-ui/Toggle'
import AnswerBar from '../presentations/AnswerBar'

import { StyleSheet, css } from 'aphrodite'
import RankRange from '../presentations/RankRange'
import {Button} from 'react-bootstrap'

import {
  ShareButtons,
  generateShareIcon,
} from 'react-share'

export default class PuzzlePanel extends Component {


  static propTypes = {
    puzzle: T.object.isRequired,
    rangeFilter: T.object.isRequired,
    className: T.object,
    params: T.object,
    dispatch: T.func,
    auth: T.object,
    addSteps: T.func,
    resetSteps: T.func,
    handleReset: T.func,
    steps: T.array,
    setCurrentAnswerId: T.func,
    setCurrentMode: T.func,
    currentMode: T.string,
    currentAnswerId: T.number,
    showNext: T.bool,
    handleNext: T.func.isRequired,
    handleRangeChange: T.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      answersExpanded: true,
      favorite: this.props.puzzle.is_favorite,
    }

  }

  handleResearchMode() {
    if (this.props.currentMode === 'answer') {
      this.props.setCurrentMode('research')
    } else {
      this.props.setCurrentMode('answer')
    }
  }

  handleFavorite(id) {
    const { auth } = this.props
    let profile = auth.getProfile()
    if (auth.loggedIn()) {
      this.setState({favorite: !this.state.favorite})
      this.props.dispatch(postFavorite({
        likable_id: id,
        likable_type: 'Puzzle',
        value: !this.state.favorite,
        scope: 'favorite',
        user_id: profile.user_id
      }))
    } else {
      auth.login()
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

  componentWillReceiveProps(nextProps) {
    this.setState({favorite: nextProps.puzzle.is_favorite})
  }

  render() {
    const {
      FacebookShareButton,
      GooglePlusShareButton,
      LinkedinShareButton,
      TwitterShareButton,
      PinterestShareButton,
      VKShareButton,
      TelegramShareButton,
      WhatsappShareButton,
    } = ShareButtons

    const FacebookIcon = generateShareIcon('facebook')
    const TwitterIcon = generateShareIcon('twitter')
    const GooglePlusIcon = generateShareIcon('google')
    const LinkedinIcon = generateShareIcon('linkedin')
    const PinterestIcon = generateShareIcon('pinterest')
    const VKIcon = generateShareIcon('vk')
    const TelegramIcon = generateShareIcon('telegram')
    const WhatsappIcon = generateShareIcon('whatsapp')

    let puzzle = this.props.puzzle
    if (puzzle === undefined) return null

    let shareUrl = `${location.protocol}//${location.host}${location.pathname}`
    let title = `P-${puzzle.id}`
    let exampleImage = puzzle.preview_img_r1.x400.url

    let rightAnswers = []
    let wrongAnswers = []
    let nextPanel, nextBtn
    if (this.props.showNext === true) {
      nextBtn = <Button style={{marginRight: '10px'}} onClick={this.props.handleNext} bsStyle="info"> Next Tsumego </Button>
      nextPanel = <RankRange rankRange={this.props.rangeFilter} handleRangeChange={this.props.handleRangeChange} ref='range' />
    }
    if (puzzle != null && puzzle.right_answers != null && puzzle.wrong_answers != null) {
      puzzle.right_answers.forEach((i) => {
        rightAnswers.push(
          <AnswerBar
            setCurrentAnswerId={this.props.setCurrentAnswerId}
            addSteps={this.props.addSteps}
            resetSteps={this.props.resetSteps}
            key={i.id}
            id={i.id}
            answer={i.steps}
            steps={this.props.steps}
            currentAnswerId={this.props.currentAnswerId}
            setCurrentMode={this.props.setCurrentMode}
            current={0}
            up={0}
            down={0}
          />
        )
      })
      puzzle.wrong_answers.forEach((i) => {
        wrongAnswers.push(
          <AnswerBar
            setCurrentAnswerId={this.props.setCurrentAnswerId}
            addSteps={this.props.addSteps}
            resetSteps={this.props.resetSteps}
            key={i.id}
            id={i.id}
            answer={i.steps}
            steps={this.props.steps}
            currentAnswerId={this.props.currentAnswerId}
            setCurrentMode={this.props.setCurrentMode}
            current={0}
            up={0}
            down={0}
          />
        )
      })
    }
    return (
      <div className={this.props.className}>
        <div className='title'>
          {`${puzzle.whofirst} ${puzzle.rank}`}&nbsp;&nbsp;
          {/*
          <a onClick={this.handleFavorite.bind(this, puzzle.id)}
            className={`favorite ${this.state.favorite === true ? 'active' : ''}`}
            title={`${this.state.favorite === true ? 'Cancle Favorite' : 'Favorite'}`}>
            <i className="fa fa-heart" aria-hidden="true"></i>
          </a>
          */}
        </div>
        <div>
          <strong>NO.:</strong>{`P-${puzzle.id}`}&nbsp;&nbsp;&nbsp;
          <i className="fa fa-check" aria-hidden="true"></i><span>&nbsp;{puzzle.right_count}</span>&nbsp;&nbsp;
          <i className="fa fa-times" aria-hidden="true"></i><span>&nbsp;{puzzle.wrong_count}</span>&nbsp;&nbsp;
          <i className="fa fa-heart" aria-hidden="true"></i><span>&nbsp;{puzzle.favorite_count}</span>&nbsp;&nbsp;
        </div>
        <div className="button-container">
          <Button
            style={{marginRight: '10px'}}
            onClick={this.props.handleReset}
            bsStyle="primary">
            Reset
          </Button>
          { nextBtn }
        </div>
        <div>
          { nextPanel }
        </div>
        <div className="share-container">
          <div className="share-box">
            <FacebookShareButton
              url={shareUrl}
              title={title}
              picture={`${exampleImage}`}
              className="share-button">
              <FacebookIcon
                size={32}
                round />
            </FacebookShareButton>
          </div>

          <div className="share-box">
            <TwitterShareButton
              url={shareUrl}
              title={title}
              className="share-button">
              <TwitterIcon
                size={32}
                round />
            </TwitterShareButton>
          </div>

          <div className="share-box">
            <TelegramShareButton
              url={shareUrl}
              title={title}
              className="share-button">
              <TelegramIcon size={32} round />
            </TelegramShareButton>
          </div>

          <div className="share-box">
            <WhatsappShareButton
              url={shareUrl}
              title={title}
              separator=":: "
              className="share-button">
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
          </div>

          <div className="share-box">
            <GooglePlusShareButton
              url={shareUrl}
              className="share-button">
              <GooglePlusIcon
                size={32}
                round />
            </GooglePlusShareButton>
          </div>

          <div className="share-box">
            <LinkedinShareButton
              url={shareUrl}
              title={title}
              windowWidth={750}
              windowHeight={600}
              className="share-button">
              <LinkedinIcon
                size={32}
                round />
            </LinkedinShareButton>
          </div>

          <div className="share-box">
            <PinterestShareButton
              url={String(window.location)}
              media={`${exampleImage}`}
              windowWidth={1000}
              windowHeight={730}
              className="share-button">
              <PinterestIcon size={32} round />
            </PinterestShareButton>
          </div>

          <div className="share-box">
            <VKShareButton
              url={shareUrl}
              image={`${exampleImage}`}
              windowWidth={660}
              windowHeight={460}
              className="share-button">
              <VKIcon
                size={32}
                round />
            </VKShareButton>
          </div>
        </div>
        <div className="clearfix"></div>
        <Toggle
          className="research"
          label="Research Mode"
          defaultToggled={this.props.currentMode === 'research'}
          onToggle={::this.handleResearchMode}
        />
        <div className={css(styles.answersContainer)}>
          <div>Right Answers</div>
          { rightAnswers }
          <div>Wrong Answers</div>
          { wrongAnswers }
        </div>
      </div>
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

})
