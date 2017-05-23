import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Favorite from 'material-ui/svg-icons/action/favorite';
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

import { StyleSheet, css } from 'aphrodite';
import PuzzleList from '../components/PuzzleList';
import mainStyles from '../styles/main';
import { fetchPractice, fetchPracticeRecord } from '../actions/FetchActions';
import PuzzlePanel from '../components/PuzzlePanel';

import {
  postPuzzleRecord,
  postPracticeRecord,
} from '../actions/PostActions';
import {
  setCurrentMode,
  addSteps,
  resetSteps,
  setCurrentAnswerId,
  setPracticePuzzleId,
} from '../actions/Actions';

const styles = StyleSheet.create({

  list: {
    display: 'flex',
    height: 'calc(100vmin - 100px)',
    overflow: 'hidden',
    overflowY: 'visible',
  },

  board: {
    flex: '1 1 auto',
    width: 'calc(100vmin - 100px)',
    height: 'calc(100vmin - 100px)',
    marginLeft: '20px',
  },

  panel: {
    padding: '20px',
    flex: '0 0 270px',
    height: 'calc(100vmin - 100px)',
    marginLeft: '20px',
  },

  resultPanel: {
    marginLeft: '20px',
  },

  favorite: {
    width: '30px',
    height: '30px',
    color: 'red',
  },

  title: {
    padding: '15px 0px',
    fontSize: '16px',
  },

  content: {
    fontSize: '22px',
    fontWeight: 'bold',
  },

  alert: {
    marginTop: '20px',
    marginRight: '10px',
  },

});

class Practice extends Component {

  static propTypes = {
    practice: PropTypes.shape({
      data: PropTypes.shape({
        id: PropTypes.number.isRequired,
        life: PropTypes.number.isRequired,
        time: PropTypes.number.isRequired,
        puzzles: PropTypes.arrayOf({}).isRequired,
      }).isRequired,
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
    currentPuzzleId: PropTypes.number.isRequired,
    route: PropTypes.shape({
      path: PropTypes.string.isRequired,
    }).isRequired,
    rangeFilter: PropTypes.string.isRequired,
    currentMode: PropTypes.string.isRequired,
    currentAnswerId: PropTypes.string.isRequired,
    steps: PropTypes.string.isRequired,
  }

  static contextTypes = {
    auth: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.handlePause = this.handlePause.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGo = this.handleGo.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleNo = this.handleNo.bind(this);
    this.handleSubmitRecorda = this.handleSubmitRecord.bind(this);
    this.handleScoreClose = this.handleScoreClose.bind(this);
    this.handleScore = this.handleScore.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.timer = this.timer.bind(this);
  }

  state = {
    resultMode: false,
    scoreDisplay: false,
    score: 0,
    resultId: null,
    submit: false,
    alert: false,
    alertContent: 'Are you ready?',
    alertTitle: 'Ready',
    alertButtonText: 'Go',
    intervalId: null,
    time: 60,
    life: 5,
    record: [],
  }


  componentDidMount() {
    const { id } = this.props.params;
    if (this.props.route.path === '/practice_records/:id') {
      this.props.dispatch(fetchPracticeRecord({ id })).then((data) => {
        const pid = data.payload.data.practice_id;
        this.props.dispatch(fetchPractice({ id: pid })).then(() => {
          this.setState({
            life: this.props.practice.data.life,
            time: this.props.practice.data.time,
          });
        }).then(() => {
          this.setState({ resultMode: true });
        });
      });
    } else {
      this.props.dispatch(fetchPractice({ id })).then(() => {
        this.setState({
          alert: true,
          life: this.props.practice.data.life,
          time: this.props.practice.data.time,
        });
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  setCurrentMode(mode) {
    this.props.dispatch(setCurrentMode(mode));
  }

  setCurrentAnswerId(id) {
    this.props.dispatch(setCurrentAnswerId(id));
  }

  getCurrentPuzzleIndex() {
    return _.findIndex(this.props.practice.data.puzzles,
      { id: this.props.currentPuzzleId || this.props.practice.data.puzzles[0].id });
  }

  getCurrentPuzzle() {
    return _.find(this.props.practice.data.puzzles,
      { id: this.props.currentPuzzleId || this.props.practice.data.puzzles[0].id });
  }

  componentUnmount() {
    clearInterval(this.state.intervalId);
  }

  nextPuzzle() {
    const puzzleCount = this.props.practice.data.puzzles.length;
    if (this.state.record.length < puzzleCount) {
      for (let i = 0; i < puzzleCount; i++) {
        const record = _.find(this.state.record, { index: i });
        if (record === undefined) {
          this.props.dispatch(setPracticePuzzleId(this.props.practice.data.puzzles[i].id));
          this.handlePanelReset();
          return;
        }
      }
    } else {
      clearInterval(this.state.intervalId);
      this.handleSubmitRecord();
    }
  }

  buildPracticeRecord(isRight) {
    const puzzle = this.getCurrentPuzzle();
    this.state.record.push({
      puzzle_id: puzzle.id,
      index: this.getCurrentPuzzleIndex(),
      isRight,
    });
  }

  addSteps(step) {
    this.props.dispatch(addSteps(step));
  }

  resetSteps() {
    this.props.dispatch(resetSteps());
  }

  handleAfterClick() {
    this.handleTimeReset();
  }

  handleClick(id) {
    this.props.dispatch(resetSteps());
    this.props.dispatch(setPracticePuzzleId(id));
  }

  handleRight() {
    this.buildPracticeRecord(true);
    this.handlePuzzleRecord('right');
    clearInterval(this.state.intervalId);
    // TODO: refs is deprecated
    // this.refs.board.handleRightTipOpen();
    setTimeout(() => {
      this.handleTimeReset();
      this.handleReset();
      this.nextPuzzle();
    }, 2000);
  }

  handleWrong(isRecord = true) {
    if (isRecord) {
      this.handlePuzzleRecord('wrong');
    }
    clearInterval(this.state.intervalId);
    // TODO: refs is deprecated
    // this.refs.board.handleWrongTipOpen();
    this.minusLife();
    setTimeout(() => {
      this.handleTimeReset();
      this.handleReset();
      if (this.state.life === 0) {
        this.buildPracticeRecord(false);
        this.nextPuzzle();
      } else {
        this.setState({
          intervalId: setInterval(this.timer, 1000),
        });
      }
    }, 2000);
  }

  // handleReset() {
    // TODO: refs is deprecated
    // this.refs.board.handleTipsReset();
    // this.refs.board.reset();
  // }

  handleTimeReset() {
    this.setState({ time: this.props.practice.data.time });
  }

  handlePanelReset() {
    this.setState({
      time: this.props.practice.data.time,
      life: this.props.practice.data.life,
      intervalId: setInterval(this.timer, 1000),
    });
  }

  handlePause() {
    clearInterval(this.state.intervalId);
    this.setState({
      alertTitle: 'Pause',
      alertContent: `Time left: ${this.state.time}s`,
      alertButtonText: 'Continue',
      alert: true,
    });
  }

  handleSubmit() {
    clearInterval(this.state.intervalId);
    this.setState({ submit: true });
  }

  handleNo() {
    this.setState({
      submit: false,
      intervalId: setInterval(this.timer, 1000),
    });
  }

  handleScoreClose() {
    this.setState({ scoreDisplay: false });
  }

  handleScore() {
    clearInterval(this.state.intervalId);
    this.setState({
      resultMode: true,
      scoreDisplay: false,
    }, () => {
      const nextUrl = `/practice_records/${this.state.resultId}`;
      this.props.dispatch(push(nextUrl));
    });
  }

  handleSubmitRecord() {
    const puzzleCount = this.props.practice.data.puzzles.length;
    const { auth } = this.context;
    const rightRecords = _.find(this.state.record, { isRight: true }) || [];
    const rightCount = rightRecords.length;
    const profile = auth.getProfile();
    this.props.dispatch(postPracticeRecord({
      right_count: rightCount,
      wrong_count: puzzleCount - rightCount,
      puzzle_count: puzzleCount,
      total_time: 0,
      practice_id: this.props.practice.data.id,
      user_id: profile.id,
      results: this.state.record,
    })).then((data) => {
      this.setState({
        submit: false,
        scoreDisplay: true,
        score: data.payload.data.score,
        resultId: data.payload.data.id,
      });
    });
  }

  handleGo() {
    this.setState({
      alert: false,
      intervalId: setInterval(this.timer, 1000),
    });
  }


  minusLife() {
    this.setState((prevState) => {
      if (prevState.life > 0) {
        return { life: prevState.life - 1 };
      }
      return { left: 0 };
    });
  }

  timer() {
    this.setState((prevState) => {
      let time = prevState.time;
      if (time > 0) {
        time -= 1;
      } else {
        this.handleWrong(false);
      }
      return { time };
    });
  }

  handlePuzzleRecord(type) {
    const { auth } = this.context;
    const profile = auth.getProfile();
    const puzzle = this.getCurrentPuzzle();

    this.props.dispatch(postPuzzleRecord({
      puzzle_id: puzzle.id,
      user_id: profile.user_id,
      record_type: type,
    }));
  }

  render() {
    const actions = [
      <FlatButton
        label={this.state.alertButtonText}
        primary
        onTouchTap={this.handleGo}
      />,
    ];
    const submitActions = [
      <FlatButton
        label="No"
        onTouchTap={this.handleNo}
      />,
      <FlatButton
        label="Yes"
        primary
        onTouchTap={this.handleSubmitRecord}
      />,
    ];
    const scoreActions = [
      <FlatButton
        label="Close"
        onTouchTap={this.handleScoreClose}
      />,
      <FlatButton
        label="Details"
        primary
        onTouchTap={this.handleScore}
      />,
    ];
    let puzzleList;
    let puzzle;
    let puzzleBoard;
    let whofirst;
    let rank;
    let favorite;
    let panel;
    if (this.props.practice.data !== undefined) {
      puzzle = this.getCurrentPuzzle();
      puzzleList = (<PuzzleList
        puzzleListOnClick={this.handleClick}
        puzzleList={this.props.practice.data.puzzles}
        currentPuzzleId={puzzle.id}
        record={this.state.record}
      />);

      // puzzleBoard = <PuzzleBoard
        // className="board"
        // steps={this.props.steps}
        // addSteps={this.addSteps}
        // resetSteps={this.resetSteps}
        // puzzle={puzzle}
        // handleRight={this.handleRight}
        // handleWrong={this.handleWrong}
        // currentMode={this.props.currentMode}
        // setCurrentMode={this.setCurrentMode}
        // ref="board"
        // afterClickEvent={this.handleAfterClick}
      // />

      whofirst = <h1 className={css(styles.content)}>{puzzle.whofirst}</h1>;
      rank = puzzle.rank;
      favorite = [];
      for (let i = 0; i < this.state.life; i++) {
        favorite.push(<Favorite key={`fav-${i}`} className={css(styles.favorite)} />);
      }
      for (let i = 0; i < this.props.practice.data.life - this.state.life; i++) {
        favorite.push(<FavoriteBorder key={`fav-b-${i}`} className={css(styles.favorite)} />);
      }
    }
    if (this.state.resultMode === true) {
      panel =
        (<PuzzlePanel
          className={css(styles.resultPanel)}
          puzzle={puzzle}
          handleRangeChange={this.handleRangeChange}
          handleNext={this.handleNext}
          rangeFilter={this.props.rangeFilter}
          handleReset={this.handleReset}
          addSteps={this.addSteps}
          resetSteps={this.resetSteps}
          setCurrentAnswerId={this.setCurrentAnswerId}
          setCurrentMode={this.setCurrentMode}
          currentMode={this.props.currentMode}
          currentAnswerId={this.props.currentAnswerId}
          steps={this.props.steps}
        />);
    } else {
      panel =
        (<Paper>
          <div>
            <div>
              { whofirst }
            </div>
            <Divider />
            <div>
              <div className={css(styles.title)}>Rank: </div>
              <div className={css(styles.content)}>{ rank }</div>
            </div>
            <div>
              <div className={css(styles.title)}>Life: </div>
              { favorite }
            </div>
            <div>
              <div className={css(styles.title)}>Time Left:</div>
              <div className={css(styles.content)}>{`${this.state.time}s`}</div>
            </div>
            <div>
              <RaisedButton
                className={css(styles.alert)}
                onClick={this.handlePause}
                label="Pause"
                primary
              />
              <RaisedButton
                className={css(styles.alert)}
                onClick={this.handleSubmit}
                label="Submit"
                secondary
              />
            </div>
          </div>
        </Paper>);
    }
    return (
      <div className={css(mainStyles.mainContainer)}>
        <Dialog
          bodyStyle={{ fontSize: '20px' }}
          title={this.state.alertTitle}
          actions={actions}
          modal
          open={this.state.alert}
        >
          { this.state.alertContent }
        </Dialog>
        <Dialog
          bodyStyle={{ fontSize: '24px' }}
          title="Submit"
          actions={submitActions}
          modal
          open={this.state.submit}
        >
          Do you want to submit?
        </Dialog>
        <Dialog
          bodyStyle={{ fontSize: '32px' }}
          title="Your Score"
          actions={scoreActions}
          modal
          open={this.state.scoreDisplay}
        >
          {`${this.state.score}`}
        </Dialog>
        <Paper className={css(styles.list)}>
          { puzzleList }
        </Paper>
        <Paper className={css(styles.board)}>
          { puzzleBoard }
        </Paper>
        { panel }
      </div>
    );
  }
}

function select(state) {
  return {
    currentPuzzleId: state.practicePuzzleId,
    practice: state.practice,
    steps: state.steps,
    rangeFilter: state.rangeFilter,
    currentAnswerId: state.currentAnswerId,
    currentMode: state.currentMode,
  };
}

export default connect(select)(Practice);
