import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Toggle from 'material-ui/Toggle';
import { StyleSheet, css } from 'aphrodite';
import { Button } from 'react-bootstrap';
import { ShareButtons, generateShareIcon } from 'react-share';

import AnswerBar from '../presentations/AnswerBar';
import RankRange from '../presentations/RankRange';
import { postRating, postFavorite } from '../actions/PostActions';

const styles = StyleSheet.create({

  answersContainer: {
    padding: '0px',
    '@media screen and (max-aspect-ratio: 4/3)': {
      padding: '0px',
    },
  },

});

export default class PuzzlePanel extends Component {

  static propTypes = {
    puzzle: PropTypes.shape({
      is_favorite: PropTypes.bool.isRequired,
    }).isRequired,
    rangeFilter: PropTypes.shape({}).isRequired,
    className: PropTypes.shape({}).isRequired,
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
    auth: PropTypes.shape({}).isRequired,
    addSteps: PropTypes.func.isRequired,
    resetSteps: PropTypes.func.isRequired,
    handleReset: PropTypes.func.isRequired,
    steps: PropTypes.arrayOf({}).isRequired,
    setCurrentAnswerId: PropTypes.func.isRequired,
    setCurrentMode: PropTypes.func.isRequired,
    currentMode: PropTypes.string.isRequired,
    currentAnswerId: PropTypes.number.isRequired,
    showNext: PropTypes.bool.isRequired,
    handleNext: PropTypes.func.isRequired,
    handleRangeChange: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      answersExpanded: true,
      favorite: this.props.puzzle.is_favorite,
    };

    this.handleResearchMode = this.handleResearchMode.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ favorite: nextProps.puzzle.is_favorite });
  }

  handleResearchMode() {
    if (this.props.currentMode === 'answer') {
      this.props.setCurrentMode('research');
    } else {
      this.props.setCurrentMode('answer');
    }
  }

  handleFavorite(id) {
    const { auth } = this.props;
    const profile = auth.getProfile();
    if (auth.loggedIn()) {
      this.setState({ favorite: !this.state.favorite });
      this.props.dispatch(postFavorite({
        likable_id: id,
        likable_type: 'Puzzle',
        value: !this.state.favorite,
        scope: 'favorite',
        user_id: profile.user_id,
      }));
    } else {
      auth.login();
    }
  }

  handleRatingChange(rate) {
    const { auth } = this.props;
    const profile = auth.getProfile();
    if (auth.loggedIn()) {
      const { id } = this.props.params;
      this.props.dispatch(postRating({
        ratable_id: id,
        ratable_type: 'Puzzle',
        score: rate,
        user_id: profile.user_id,
      })).then((promise) => {
        if (promise.type === 'POST_RATING_SUCCESS') {
          this.setState({
            open: true,
            score: rate,
            ratingInfo: promise.payload.data.message || 'Thanks for you rating!',
          });
        }
      });
    } else {
      auth.login();
    }
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
    } = ShareButtons;

    const FacebookIcon = generateShareIcon('facebook');
    const TwitterIcon = generateShareIcon('twitter');
    const GooglePlusIcon = generateShareIcon('google');
    const LinkedinIcon = generateShareIcon('linkedin');
    const PinterestIcon = generateShareIcon('pinterest');
    const VKIcon = generateShareIcon('vk');
    const TelegramIcon = generateShareIcon('telegram');
    const WhatsappIcon = generateShareIcon('whatsapp');

    const puzzle = this.props.puzzle;
    if (puzzle === undefined) return null;

    const shareUrl = `${location.protocol}//${location.host}${location.pathname}`;
    const title = `P-${puzzle.id}`;
    const exampleImage = puzzle.preview_img_r1.x400.url;

    const rightAnswers = [];
    const wrongAnswers = [];
    let nextPanel;
    let nextBtn;
    if (this.props.showNext === true) {
      nextBtn = <Button style={{ marginRight: '10px' }} onClick={this.props.handleNext} bsStyle="info"> Next Tsumego </Button>;
      nextPanel = (
        <RankRange
          rankRange={this.props.rangeFilter}
          handleRangeChange={this.props.handleRangeChange}
        />
      );
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
          />,
        );
      });
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
          />,
        );
      });
    }
    return (
      <div className={this.props.className}>
        <div className="title">
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
          <i className="fa fa-check" aria-hidden="true" /><span>&nbsp;{puzzle.right_count}</span>&nbsp;&nbsp;
          <i className="fa fa-times" aria-hidden="true" /><span>&nbsp;{puzzle.wrong_count}</span>&nbsp;&nbsp;
          <i className="fa fa-heart" aria-hidden="true" /><span>&nbsp;{puzzle.favorite_count}</span>&nbsp;&nbsp;
        </div>
        <div className="button-container">
          <Button
            style={{ marginRight: '10px' }}
            onClick={this.props.handleReset}
            bsStyle="primary"
          >
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
              className="share-button"
            >
              <FacebookIcon
                size={32}
                round
              />
            </FacebookShareButton>
          </div>

          <div className="share-box">
            <TwitterShareButton
              url={shareUrl}
              title={title}
              className="share-button"
            >
              <TwitterIcon
                size={32}
                round
              />
            </TwitterShareButton>
          </div>

          <div className="share-box">
            <TelegramShareButton
              url={shareUrl}
              title={title}
              className="share-button"
            >
              <TelegramIcon size={32} round />
            </TelegramShareButton>
          </div>

          <div className="share-box">
            <WhatsappShareButton
              url={shareUrl}
              title={title}
              separator=":: "
              className="share-button"
            >
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
          </div>

          <div className="share-box">
            <GooglePlusShareButton
              url={shareUrl}
              className="share-button"
            >
              <GooglePlusIcon
                size={32}
                round
              />
            </GooglePlusShareButton>
          </div>

          <div className="share-box">
            <LinkedinShareButton
              url={shareUrl}
              title={title}
              windowWidth={750}
              windowHeight={600}
              className="share-button"
            >
              <LinkedinIcon
                size={32}
                round
              />
            </LinkedinShareButton>
          </div>

          <div className="share-box">
            <PinterestShareButton
              url={String(window.location)}
              media={`${exampleImage}`}
              windowWidth={1000}
              windowHeight={730}
              className="share-button"
            >
              <PinterestIcon size={32} round />
            </PinterestShareButton>
          </div>

          <div className="share-box">
            <VKShareButton
              url={shareUrl}
              image={`${exampleImage}`}
              windowWidth={660}
              windowHeight={460}
              className="share-button"
            >
              <VKIcon
                size={32}
                round
              />
            </VKShareButton>
          </div>
        </div>
        <div className="clearfix" />
        <Toggle
          className="research"
          label="Research Mode"
          defaultToggled={this.props.currentMode === 'research'}
          onToggle={this.handleResearchMode}
        />
        <div className={css(styles.answersContainer)}>
          <div>Right Answers</div>
          { rightAnswers }
          <div>Wrong Answers</div>
          { wrongAnswers }
        </div>
      </div>
    );
  }

}
