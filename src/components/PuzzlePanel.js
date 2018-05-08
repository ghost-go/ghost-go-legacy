import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Toggle from 'material-ui/Toggle';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import { Button } from 'react-bootstrap';
import AuthService from '../common/AuthService';
import { postFavorite } from '../actions/PostActions';

import AnswerBar from '../components/AnswerBar';
import RankRange from '../components/RankRange';

const styles = StyleSheet.create({

  answersContainer: {
    padding: '0px',
    '@media screen and (max-aspect-ratio: 4/3)': {
      padding: '0px',
    },
  },

});

class PuzzlePanel extends Component {
  static propTypes = {
    puzzle: PropTypes.shape({
      data: PropTypes.shape({
        is_favorite: PropTypes.bool.isRequired,
      }),
    }).isRequired,
    rangeFilter: PropTypes.shape({}).isRequired,
    className: PropTypes.string,
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
    dispatch: PropTypes.func.isRequired,
    auth: PropTypes.instanceOf(AuthService).isRequired,
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
    this.handleFavorite = this.handleFavorite.bind(this);
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

  handleFavorite() {
    const { auth, puzzle } = this.props;
    const profile = AuthService.getProfile();
    if (auth.loggedIn()) {
      this.props.dispatch(postFavorite({
        likable_id: puzzle.data.id,
        likable_type: 'Puzzle',
        value: !puzzle.data.is_favorite,
        scope: 'favorite',
        user_id: profile.user_id,
      }));
    } else {
      auth.login();
    }
  }

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
          {`${puzzle.data.whofirst} ${puzzle.data.rank}`}&nbsp;&nbsp;
          <button
            onClick={this.handleFavorite}
            className={`favorite ${this.props.puzzle.data.is_favorite === true ? 'active' : ''}`}
            title={`${this.props.puzzle.data.is_favorite === true ? 'Cancle Favorite' : 'Favorite'}`}
          >
            <i className="fa fa-heart" aria-hidden="true" />
          </button>
        </div>
        <div>
          <strong>NO.:</strong>{`P-${puzzle.data.id}`}&nbsp;&nbsp;&nbsp;
          <i className="fa fa-check" aria-hidden="true" /><span>&nbsp;{puzzle.data.right_count}</span>&nbsp;&nbsp;
          <i className="fa fa-times" aria-hidden="true" /><span>&nbsp;{puzzle.data.wrong_count}</span>&nbsp;&nbsp;
          <i className="fa fa-heart" aria-hidden="true" /><span>&nbsp;{puzzle.data.favorite_count}</span>&nbsp;&nbsp;
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
            Next Problem
          </Button>
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

function select(state) {
  return {
    auth: state.ui.auth,
    puzzle: state.puzzle,
    rangeFilter: state.rangeFilter,
  };
}

export default connect(select)(PuzzlePanel);
