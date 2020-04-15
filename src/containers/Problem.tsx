import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import * as Helper from "../common/Helper";
// import * as Const from '../common/Constants';
import Toggle from "material-ui/Toggle";
import Board from "../eboard/Board";
import RankRange from "../components/RankRange";
import AnswerBar from "../components/AnswerBar";
import { addMoves, clearMoves, updateSettings } from "../common/utils";
import { useQuery, gql } from "@apollo/client";

const GET_PROBLEM = gql`
  query getProblem($id: ID!) {
    moves @client
    settings @client
    problem(id: $id) {
      id
      identifier
      steps
      rank
      whofirst
      rightCount
      wrongCount
      favoriteCount
      name
      problemAnswers {
        id
        identifier
        answerType
        steps
      }
    }
  }
`;

const Problem = () => {
  const id = window.location.pathname.split("/").pop();
  const { data, loading, error, client } = useQuery(GET_PROBLEM, {
    variables: { id },
  });
  const [rightAnswers, setRightAnswers] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [changeAnswers, setChangeAnswers] = useState([]);
  const [problem, setProblem] = useState({
    whofirst: "Black",
    rank: "18K",
    identifier: "",
    rightAnswers: [],
    wrongAnswers: [],
    rightCount: 0,
    wrongCount: 0,
    favoriteCount: 0,
    steps: "",
  });
  const [settings, setSettings] = useState({
    levelFilter: "all",
    theme: "black-and-white",
    currentMode: "normal",
  });
  const [nextStoneType, setNextStoneType] = useState(1);
  const [isRight, setIsRight] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [boardEditable, setBoardEditable] = useState(true);

  const [moves, setMoves] = useState([]);

  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const handleReset = () => {
    clearMoves();
    updateSettings({ currentAnswerId: 0 });
    setIsRight(false);
    setIsWrong(false);
    setBoardEditable(true);
  };

  const handleRight = () => {
    setIsRight(true);
    setBoardEditable(false);
  };

  const handleWrong = () => {
    setIsWrong(true);
    setTimeout(() => {
      handleReset();
    }, 1000);
  };

  useEffect(() => {
    if (!data) return;

    setProblem(data.problem);
    setSettings(data.settings);
    setMoves(data.moves);
    setNextStoneType(data.problem.whofirst[0] === "B" ? 1 : -1);

    setRightAnswers(
      data.problem.problemAnswers.filter((p: any) => p.answerType === 1)
    );
    setWrongAnswers(
      data.problem.problemAnswers.filter((p: any) => p.answerType === 2)
    );
    setChangeAnswers(
      data.problem.problemAnswers.filter((p: any) => p.answerType === 3)
    );
  }, [data]);

  const response = (moves: Array<string>) => {
    const rights: any = [];
    const wrongs: any = [];

    rightAnswers.forEach((i: any) => {
      if (i.steps.indexOf(moves.join(";")) === 0) {
        rights.push(i);
      }
    });
    wrongAnswers.forEach((i: any) => {
      if (i.steps.indexOf(moves.join(";")) === 0) {
        wrongs.push(i);
      }
    });

    if (rights.length > 0) {
      const i = Math.floor(Math.random() * rights.length);
      let stepsStr = moves.join(";");
      if (rights[i].steps === stepsStr) {
        handleRight();
      } else {
        const step = rights[i].steps.split(";")[moves.length];
        addMoves([step]);
        stepsStr = moves.join(";");
        if (rights[i].steps === stepsStr) {
          handleRight();
        }
      }
    } else if (wrongs.length > 0) {
      const i = Math.floor(Math.random() * wrongs.length);
      let stepsStr = moves.join(";");
      if (wrongs[i].steps === stepsStr) {
        handleWrong();
      } else {
        const step = wrongs[i].steps.split(";")[moves.length];
        addMoves([step]);
        stepsStr = moves.join(";");
        if (wrongs[i].steps === stepsStr) {
          handleWrong();
        }
      }
    } else {
      handleWrong();
    }
  };

  useEffect(() => {
    if (problem && settings && moves && canvasRef.current) {
      const { width, height } = window.screen;
      const boardWidth =
        width > height ? window.innerHeight - 60 : window.innerWidth;
      if (canvasRef.current !== null) {
        canvasRef.current.width = boardWidth;
        canvasRef.current.height = boardWidth;
      }

      const board = new Board({
        autofit: true,
        canvas: canvasRef.current,
        showCoordinate: true,
        editable: boardEditable,
        theme: settings.theme,
        nextStoneType: nextStoneType,
        afterMove: (step: string) => {
          const moves = addMoves([step]);
          setNextStoneType(-nextStoneType);
          setTimeout(() => {
            if (settings.currentMode !== "research") {
              response(moves);
            }
            setNextStoneType(-nextStoneType);
          }, 300);
        },
      });
      const totalSteps = problem.steps.split(";");
      board.setStones(Helper.CoordsToTree(totalSteps.concat(moves)));
      board.render();
    }
  }, [problem, settings, moves, client, nextStoneType, boardEditable]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <React.Fragment>
      <div className="puzzle-board">
        <canvas id="puzzle_layer" ref={canvasRef} />
        <i
          className={`fa fa-check problem-right ${isRight ? "" : "hide"}`}
          aria-hidden="true"
        />
        <i
          className={`fa fa-times problem-wrong ${isWrong ? "" : "hide"}`}
          aria-hidden="true"
        />
      </div>
      <div className="puzzle-panel">
        <div className="title">
          {`${problem.whofirst} ${problem.rank}`}&nbsp;&nbsp;
          <button
          // onClick={this.handleFavorite}
          // className={`favorite ${this.state.is_favorite === true ? 'active' : ''}`}
          // title={`${this.state.is_favorite === true ? 'Cancle Favorite' : 'Favorite'}`}
          >
            <i className="fa fa-heart bounceIn" aria-hidden="true" />
          </button>
        </div>
        <div>
          <strong>NO.:</strong>
          {`P-${problem.identifier}`}&nbsp;&nbsp;&nbsp;
          <i className="fa fa-check" aria-hidden="true" />
          <span>&nbsp;{problem.rightCount}</span>&nbsp;&nbsp;
          <i className="fa fa-times" aria-hidden="true" />
          <span>&nbsp;{problem.wrongCount}</span>&nbsp;&nbsp;
          <i className="fa fa-heart" aria-hidden="true" />
          <span>&nbsp;{problem.favoriteCount}</span>&nbsp;&nbsp;
        </div>

        <div className="button-container">
          <Button
            style={{ marginRight: "10px" }}
            onClick={handleReset}
            bsStyle="primary"
          >
            Reset
          </Button>
          <Button
            style={{ marginRight: "10px" }}
            // onClick={this.props.handleNext}
            bsStyle="info"
          >
            Next Problem
          </Button>
          <div>
            <RankRange rankRange={settings.levelFilter} />
          </div>
          <div className="clearfix" />
          <Toggle
            className="research"
            label="Research Mode"
            defaultToggled={settings.currentMode === "research"}
            onToggle={() => {
              updateSettings({
                currentMode:
                  settings.currentMode === "research" ? "normal" : "research",
              });
            }}
          />
          <div>
            <div>Right Answers</div>
            {rightAnswers.map((a: any) => (
              <AnswerBar key={a.id} id={a.identifier} answer={a.steps} />
            ))}
            <div>Wrong Answers</div>
            {wrongAnswers.map((a: any) => (
              <AnswerBar key={a.id} id={a.identifier} answer={a.steps} />
            ))}
            {changeAnswers.length > 0 && <div>Change Answers</div>}
            {changeAnswers.map((a: any) => (
              <AnswerBar key={a.id} id={a.identifier} answer={a.steps} />
            ))}
          </div>
        </div>
      </div>
      <div className="clearfix" />
    </React.Fragment>
  );
};

export default Problem;
