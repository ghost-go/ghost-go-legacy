import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; import Paper from 'material-ui/Paper';
import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';
import keydown, { Keys } from 'react-keydown';
import { CoordsToTree } from '../constants/Go';

import Board from '../eboard/Board';
import { fetchKifu } from '../actions/FetchActions';

const { LEFT, RIGHT, SPACE, ENTER } = Keys;

class Kifu extends Component {

  static propTypes = {
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
    kifu: PropTypes.shape({
      data: PropTypes.shape({
        total: PropTypes.number,
      }),
    }).isRequired,
    theme: PropTypes.string.isRequired,
    themeMaterial: PropTypes.shape({}).isRequired,
  }

  constructor() {
    super();

    this.prevStep = this.prevStep.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.firstStep = this.firstStep.bind(this);
    this.lastStep = this.lastStep.bind(this);
    this.prev10Step = this.prevStep.bind(this);
    this.next10Step = this.nextStep.bind(this);
  }

  state = {
    step: 0,
  }

  componentDidMount() {
    const { id } = this.props.params;
    this.props.dispatch(fetchKifu({ id }));
    let boardWidth = 0;
    if (screen.width > screen.height) {
      boardWidth = window.innerHeight - 60;
    } else {
      boardWidth = window.innerWidth;
    }
    this.boardLayer.width = boardWidth;
    this.boardLayer.height = boardWidth;
  }

  componentDidUpdate() {
    const { kifu } = this.props;
    const steps = kifu.data.steps.split(';').slice(0, this.state.step);
    const board = new Board({
      theme: this.props.theme,
      material: this.props.themeMaterial,
      canvas: this.boardLayer,
    });
    board.setStones(CoordsToTree(steps));
    board.render();
  }

  @keydown(ENTER, SPACE, LEFT, RIGHT)
  handleKeyboardEvents(event) {
    if (event.which === ENTER || event.which === RIGHT || event.which === SPACE) {
      this.nextStep();
    }
    if (event.which === LEFT) { this.prevStep(); }
  }

  prevStep() {
    if (this.state.step > 0) {
      this.setState({ step: this.state.step - 1 });
    }
  }

  nextStep() {
    if (this.state.step < this.props.kifu.data.total) {
      this.setState({ step: this.state.step + 1 });
    }
  }

  firstStep() {
    this.setState({ step: 1 });
  }

  lastStep() {
    const last = this.props.kifu.data.total - 1;
    this.setState({ step: last });
  }

  next10Step() {
    this.setState({ step: this.state.step + 10 });
  }

  prev10Step() {
    if (this.state.step < 10) {
      this.firstStep();
    } else {
      this.setState({ step: this.state.step - 10 });
    }
  }


  render() {
    const { kifu } = this.props;
    return (
      <div ref={input => (this.textInput = input)}>
        <div className="kifu-board">
          <canvas role="button" id="board_layer"ref={(elem) => { this.boardLayer = elem; }} onClick={this.nextStep} />
        </div>
        <div className="kifu-panel">
          <Paper>
            <Table selectable={false}>
              <TableBody displayRowCheckbox={false}>
                <TableRow>
                  <TableRowColumn className="fixed-width">
                    Black
                  </TableRowColumn>
                  <TableRowColumn>
                    { kifu.data.player_b.en_name}
                    ({ kifu.data.b_rank })
                  </TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn className="fixed-width">
                    White
                  </TableRowColumn>
                  <TableRowColumn>
                    { kifu.data.player_w.en_name}
                    ({ kifu.data.w_rank })
                  </TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn className="fixed-width">
                    Result
                  </TableRowColumn>
                  <TableRowColumn>
                    { kifu.data.result }
                  </TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn className="fixed-width">
                    Komi
                  </TableRowColumn>
                  <TableRowColumn>
                    { kifu.data.komi }
                  </TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn className="fixed-width">
                    Date
                  </TableRowColumn>
                  <TableRowColumn>
                    { kifu.data.short_date }
                  </TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn colSpan={2}>
                    <div className="control-bar">
                      <span role="button" className="move-control" onClick={this.firstStep}>
                        <i className="fa fa-fast-backward" />
                      </span>
                      <span role="button" className="move-control" onClick={this.prev10Step}>
                        <i className="fa fa-backward" />
                      </span>
                      <span role="button" className="move-control" onClick={this.prevStep}>
                        <i className="fa fa-play rotate" />
                      </span>
                      <span role="button" className="move-control" onClick={this.nextStep}>
                        <i className="fa fa-play" />
                      </span>
                      <span role="button" className="move-control" onClick={this.next10Step}>
                        <i className="fa fa-forward" />
                      </span>
                      <span role="button" className="move-control" onClick={this.lastStep}>
                        <i className="fa fa-fast-forward" />
                      </span>
                    </div>
                  </TableRowColumn> </TableRow>
                <TableRow>
                  <TableRowColumn colSpan={2}>
                    <div className="control-bar">
                      You can use the keyboard keys to control game records.
                    </div>
                  </TableRowColumn>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </div>
        <div className="clearfix" />
      </div>
    );
  }
}

function select(state) {
  return {
    kifu: state.kifu,
    theme: state.theme,
    themeMaterial: state.themeMaterial,
  };
}

export default connect(select)(Kifu);
