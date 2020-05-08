import React, { useEffect, useState, useRef } from "react";
import { Button, Row, Col } from "antd";
import Remove from "material-ui/svg-icons/content/remove";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

import { CoordsToTree } from "../common/Helper";
import Toggle from "material-ui/Toggle";
import Board from "../eboard/Board";
import RankList from "../components/RankList";
import AnswerBar from "../components/AnswerBar";
import { addMoves, clearMoves, updateSettings } from "../common/utils";
import { useQuery, useLazyQuery, useMutation, gql } from "@apollo/client";
// import { useParams } from "react-router-dom";

const CREATE_PROBLEM_RECORD = gql`
  mutation CreateProblemRecord($problemRecord: ProblemRecordInput!) {
    createProblemRecord(problemRecord: $problemRecord) {
      id
    }
  }
`;

const GET_PROBLEMS_FOR_NEXT = gql`
  query getProblems($last: Int!, $tags: String!, $level: String!) {
    problems(last: $last, tags: $tags, level: $level) {
      id
      identifier
    }
  }
`;

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
  const { data, loading, error } = useQuery(GET_PROBLEM, {
    variables: { id },
  });

  const [createProblemRecord] = useMutation(CREATE_PROBLEM_RECORD);

  const [rightAnswers, setRightAnswers] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [changeAnswers, setChangeAnswers] = useState([]);
  const [levelRangeLow, setLevelRangeLow] = useState("18k");
  const [levelRangeHigh, setLevelRangeHigh] = useState("6d");
  const [problem, setProblem] = useState({
    id: 0,
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
    levelRange: "18k-6d",
    currentMode: "normal",
  });
  const [nextStoneType, setNextStoneType] = useState(1);
  const [isRight, setIsRight] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [boardEditable, setBoardEditable] = useState(true);

  const [moves, setMoves] = useState([]);
  // const { levelRange } = useParams();

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleReset = () => {
    clearMoves();
    updateSettings({ currentAnswerId: 0 });
    setIsRight(false);
    setIsWrong(false);
    setBoardEditable(true);
  };

  const handleRight = () => {
    createProblemRecord({
      variables: {
        problemRecord: {
          problemId: problem.identifier,
          recordType: "right",
        },
      },
    });
    setIsRight(true);
    setBoardEditable(false);
  };

  const handleWrong = () => {
    createProblemRecord({
      variables: {
        problemRecord: {
          problemId: problem.identifier,
          recordType: "wrong",
        },
      },
    });
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

    setLevelRangeLow(data.settings.levelRange.split("-")[0]);
    setLevelRangeHigh(data.settings.levelRange.split("-")[1]);

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

  const [getNextProblem, nextProblemQuery] = useLazyQuery(
    GET_PROBLEMS_FOR_NEXT,
    {
      onCompleted: (data: any) => {
        // console.log(data.problems[0]);
        window.location.href = `${data.problems[0].identifier}`;
      },
    }
  );

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
      board.setStones(CoordsToTree(totalSteps.concat(moves)));
      board.render();
    }
  }, [problem, settings, moves, nextStoneType, boardEditable]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <Row gutter={[24, 0]}>
      <Col>
        <div className="problem-board">
          <canvas ref={canvasRef} />
          <CheckOutlined
            style={{
              position: "absolute",
              fontSize: "40vmin",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              color: "green",
              opacity: `${isRight ? 0 : 1}`,
              transition: "opacity 0.3s ease-in-out",
            }}
          />
          <CloseOutlined
            style={{
              position: "absolute",
              fontSize: "40vmin",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              color: "red",
              opacity: `${isWrong ? 0 : 1}`,
              transition: "opacity 0.3s ease-in-out",
            }}
          />
        </div>
      </Col>
      <Col>
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
              type="primary"
            >
              Reset
            </Button>
            <Button
              style={{ marginRight: "10px" }}
              onClick={() => {
                getNextProblem({
                  variables: {
                    last: 1,
                    tags: "all",
                    level: `${levelRangeLow}-${levelRangeHigh}`,
                  },
                });
              }}
              type="ghost"
            >
              Next Problem
            </Button>
            <div>
              <RankList
                rank={levelRangeLow}
                floatingLabelText="FROM"
                onChange={(e: any) => {
                  updateSettings({
                    levelRange: `${e.target.innerText}-${levelRangeHigh}`,
                  });
                }}
              />
              <Remove style={{ height: "50px", margin: "0 10px" }} />
              <RankList
                rank={levelRangeHigh}
                floatingLabelText="TO"
                onChange={(e: any) => {
                  updateSettings({
                    levelRange: `${levelRangeLow}-${e.target.innerText}`,
                  });
                }}
              />
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
      </Col>
    </Row>
  );
};

export default Problem;
