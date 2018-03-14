import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Toggle from 'material-ui/Toggle';
import { StyleSheet, css } from 'aphrodite';
import { Button } from 'react-bootstrap';
import { ShareButtons, generateShareIcon } from 'react-share';

import AnswerBar from '../components/AnswerBar';
import RankRange from '../components/RankRange';
import { postRating, postFavorite } from '../actions/PostActions';
import AuthService from '../common/AuthService';

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
    className: PropTypes.string,
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
    auth: PropTypes.shape({}).isRequired,
    addSteps: PropTypes.func.isRequired,
    resetSteps: PropTypes.func.isRequired,
    handleReset: PropTypes.func.isRequired,
    steps: PropTypes.arrayOf(PropTypes.string).isRequired,
    setCurrentAnswerId: PropTypes.func.isRequired,
    setCurrentMode: PropTypes.func.isRequired,
    currentMode: PropTypes.string.isRequired,
    currentAnswerId: PropTypes.number,
    handleNext: PropTypes.func.isRequired,
    handleRangeChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    className: '',
    currentAnswerId: 0,
  }

  constructor(props) {
    super(props);

    // this.state = {
    //   // answersExpanded: true,
    //   favorite: this.props.puzzle.is_favorite,
    // };

    this.handleResearchMode = this.handleResearchMode.bind(this);
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({ favorite: nextProps.puzzle.is_favorite });
  // }

  handleResearchMode() {
    if (this.props.currentMode === 'answer') {
      this.props.setCurrentMode('research');
    } else {
      this.props.setCurrentMode('answer');
    }
  }

  // handleFavorite(id) {
  //   const { auth } = this.props;
  //   const profile = AuthService.getProfile();
  //   if (AuthService.loggedIn()) {
  //     this.setState({ favorite: !this.state.favorite });
  //     this.props.dispatch(postFavorite({
  //       likable_id: id,
  //       likable_type: 'Puzzle',
  //       value: !this.state.favorite,
  //       scope: 'favorite',
  //       user_id: profile.user_id,
  //     }));
  //   } else {
  //     auth.login();
  //   }
  // }

  // handleRatingChange(rate) {
  //   const { auth } = this.props;
  //   const profile = AuthService.getProfile();
  //   if (AuthService.loggedIn()) {
  //     const { id } = this.props.params;
  //     this.props.dispatch(postRating({
  //       ratable_id: id,
  //       ratable_type: 'Puzzle',
  //       score: rate,
  //       user_id: profile.user_id,
  //     })).then((promise) => {
  //       if (promise.type === 'POST_RATING_SUCCESS') {
  //         this.setState({
  //           // open: true,
  //           // score: rate,
  //           // ratingInfo: promise.payload.data.message || 'Thanks for you rating!',
  //         });
  //       }
  //     });
  //   } else {
  //     auth.login();
  //   }
  // }

  render() {
    const { puzzle } = this.props;
    if (puzzle === undefined) return null;

    // const shareUrl = `
    // ${window.location.protocol}//${window.location.host}${window.location.pathname}`;
    // const title = `P-${puzzle.id}`;
    // const exampleImage = puzzle.preview_img_r1.x400.url;

    const rightAnswers = [];
    const wrongAnswers = [];
    if (puzzle != null && puzzle.right_answers != null && puzzle.wrong_answers != null) {
      puzzle.right_answers.forEach((i) => {
        const answer = (
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
        );
        rightAnswers.push(answer);
      });
      puzzle.wrong_answers.forEach((i) => {
        const answer = (
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
        );
        wrongAnswers.push(answer);
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
          <Button
            style={{ marginRight: '10px' }}
            onClick={this.props.handleNext}
            bsStyle="info"
          >
            Next Tsumego
          </Button>;
        </div>
        <div>
          <RankRange
            rankRange={this.props.rangeFilter}
            handleRangeChange={this.props.handleRangeChange}
          />
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
