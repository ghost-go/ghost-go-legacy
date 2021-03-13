import { useState, useEffect, useCallback, useRef } from "react";
import GBoard, { move as moveStone } from "gboard";
import styled from "styled-components";
import Avatar from "react-avatar";
import { useParams } from "react-router-dom";
import moment from "moment";

import {
  fetchProblem,
  selectProblem,
  closeProblemFilterVisible,
  selectUI,
  selectTags,
  toggleProblemFilterVisible,
  fetchTags,
} from "slices";
import { NumberParam, useQueryParam, withDefault } from "use-query-params";
import {
  useDispatch,
  useTypedSelector,
  useGenericData,
  useOutsideClick,
} from "utils";
import { zeros, matrix, Matrix } from "mathjs";
import { sgfToPosition } from "../common/Helper";
import { ProblemFilterPanel, Answer } from "components/common";

const board = new GBoard({ zoom: true });
const mats: Map<number, Matrix> = new Map();
let markMat = matrix(zeros([19, 19]));
let rightAns: any = [];
let wrongAns: any = [];
let changeAns: any = [];
let pendingRightAns: any = [];
let pendingWrongAns: any = [];

const Problem = () => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const params: { id: string } = useParams();
  const [tags] = useGenericData(useTypedSelector((state) => selectTags(state)));
  const { problemFilterVisible } = useTypedSelector((state) => selectUI(state));
  const [problem] = useGenericData(
    useTypedSelector((state) => selectProblem(state))
  );
  const [mat, setMat] = useState<Matrix>(matrix(zeros([19, 19])));
  const [levelParam = "all", setLevelParam] = useQueryParam<string>("level");
  const [tagsParam = "all", setTagsParam] = useQueryParam<string>("tags");

  const boardRef = useCallback((node) => {
    mats.set(0, matrix(zeros([19, 19])));

    if (node !== null) {
      board.init(node);
      board.render();
    }
  }, []);

  useOutsideClick(ref, () => {
    if (problemFilterVisible) {
      dispatch(closeProblemFilterVisible());
    }
  });

  useEffect(() => {
    board.render(mat, markMat);
  }, [mat]);

  useEffect(() => {
    dispatch(fetchTags());
    dispatch(fetchProblem({ pattern: { id: params.id } }));
  }, [dispatch, params]);

  useEffect(() => {
    if (problem) {
      const { steps } = problem.data.attributes;
      const moves = steps.split(";");
      let newMat = matrix(zeros([19, 19]));
      moves.forEach((move: string) => {
        const { x, y, ki } = sgfToPosition(move);
        newMat = moveStone(newMat, x, y, ki);
      });
      setMat(newMat);
      rightAns = problem.included.filter(
        (i: any) =>
          i.type === "problem_answer" && i.attributes.answer_type === 1
      );
      wrongAns = problem.included.filter(
        (i: any) =>
          i.type === "problem_answer" && i.attributes.answer_type === 2
      );
      changeAns = problem.included.filter(
        (i: any) =>
          i.type === "problem_answer" && i.attributes.answer_type === 3
      );
      pendingRightAns = problem.included.filter(
        (i: any) =>
          i.type === "problem_answer" && i.attributes.answer_type === 4
      );
      pendingWrongAns = problem.included.filter(
        (i: any) =>
          i.type === "problem_answer" && i.attributes.answer_type === 5
      );
    }
  }, [problem]);
  return (
    <div>
      {problem && (
        <div className="flex flex-col lg:flex-row">
          <div ref={ref}>
            <ProblemFilterPanel
              ref={ref}
              visible={problemFilterVisible}
              setLevelParam={setLevelParam}
              setTagsParam={setTagsParam}
              tags={tags}
            />
          </div>
          <div>
            <div className="board" id="ghost-board" ref={boardRef} />
          </div>
          <div className="flex flex-1 px-4 pt-10 flex-col text-gray-800">
            <div className="text-3xl font-bold">
              {problem.data.attributes.turn === -1
                ? "White to move"
                : "Black to move"}

              <span className="ml-2">{problem.data.attributes.rank}</span>
            </div>
            <div className="text-base mt-5 flex flex-row items-center text-gray-600">
              <span>ID: P-{problem.data.id}</span>
              <span>
                <svg
                  className="h-5 ml-3"
                  viewBox="0 -65 434.67733 434"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="m152.003906 304.34375c-5.460937 0-10.921875-2.089844-15.082031-6.25l-130.664063-130.667969c-8.34375-8.339843-8.34375-21.824219 0-30.164062 8.339844-8.339844 21.820313-8.339844 30.164063 0l115.582031 115.582031 246.253906-246.25c8.339844-8.339844 21.820313-8.339844 30.164063 0 8.339844 8.34375 8.339844 21.824219 0 30.167969l-261.332031 261.332031c-4.160156 4.160156-9.625 6.25-15.085938 6.25zm0 0" />
                </svg>
              </span>
              <span className="ml-1">
                {problem.data.attributes.right_count}
              </span>
              <span>
                <svg
                  className="h-3.5 ml-3"
                  viewBox="0 0 329.26933 329"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0" />
                </svg>
              </span>
              <span className="ml-1">
                {problem.data.attributes.wrong_count}
              </span>
            </div>
            <div className="flex flex-row mt-5 items-center">
              <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 mr-3">
                Reset
              </button>
              <button className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 mr-3">
                Next Problem
              </button>
              <div
                className="flex flex-row items-center self-end cursor-pointer"
                onClick={() => {
                  dispatch(toggleProblemFilterVisible());
                }}>
                <svg className="h-4 mr-0.5" viewBox="0 0 512.035 512.035">
                  <g>
                    <polygon points="308.296,76.933 435.229,203.866 470.856,168.282 343.922,41.349 			" />
                    <path
                      d="M485.945,26.272c-29.76-29.76-75.307-33.984-109.845-13.077l122.923,122.923
				C519.907,101.6,515.726,56.054,485.945,26.272z"
                    />
                    <path
                      d="M36.511,348.442c-2.795,2.795-4.757,6.293-5.675,10.133L0.586,485.594c-1.728,7.189,0.427,14.784,5.675,20.011
				c4.032,4.032,9.493,6.251,15.083,6.251c1.643,0,3.307-0.192,4.928-0.576l127.019-30.251c3.819-0.917,7.339-2.88,10.133-5.675
				L405.044,234.01L278.111,107.077L36.511,348.442z M313.759,198.106c8.341,8.341,8.341,21.824,0,30.165l-85.333,85.333
				c-4.16,4.16-9.621,6.251-15.083,6.251c-5.461,0-10.923-2.091-15.083-6.251c-8.341-8.341-8.341-21.824,0-30.165l85.333-85.333
				C291.935,189.765,305.418,189.765,313.759,198.106z"
                    />
                  </g>
                </svg>
                <span className="underline">
                  {levelParam}/{tagsParam}
                </span>
              </div>
            </div>
            <div className="mt-3 text-base">
              <div className="text-lg text-gray-600 font-semibold mt-2">
                Right Answers
              </div>
              <div className="flex flex-wrap">
                {rightAns.map((a: any) => (
                  <Answer answer={a} />
                ))}
              </div>
              {wrongAns.length > 0 && (
                <>
                  <div className="text-lg text-gray-600 font-semibold mt-2">
                    Wrong Answers
                  </div>
                  <div className="flex flex-wrap">
                    {wrongAns.map((a: any) => (
                      <Answer answer={a} />
                    ))}
                  </div>
                </>
              )}
              {changeAns.length > 0 && (
                <>
                  <div className="text-lg text-gray-600 font-semibold mt-2">
                    Change Answers
                  </div>
                  <div className="flex flex-wrap">
                    {changeAns.map((a: any) => (
                      <Answer answer={a} />
                    ))}
                  </div>
                </>
              )}
              {pendingRightAns.length > 0 && (
                <>
                  <div className="text-lg text-gray-600 font-semibold mt-2">
                    Pending Right Answers
                  </div>
                  <div className="flex flex-wrap">
                    {pendingRightAns.map((a: any) => (
                      <Answer answer={a} />
                    ))}
                  </div>
                </>
              )}
              {pendingWrongAns.length > 0 && (
                <>
                  <div className="text-lg text-gray-600 font-semibold mt-2">
                    Pending Wrong Answers
                  </div>
                  <div className="flex flex-wrap">
                    {pendingWrongAns.map((a: any) => (
                      <Answer answer={a} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Problem;

// import React, { useEffect, useState, useRef, useContext } from "react";
// import { Button, Switch, Row, Col, Spin } from "antd";
// import { CheckOutlined, CloseOutlined, MinusOutlined } from "@ant-design/icons";
// import { useLocation, useHistory } from "react-router-dom";

// import { CoordsToTree } from "../common/Helper";
// // import Board from "../eboard/Board";
// import RankList from "../components/RankList";
// import AnswerBar from "../components/AnswerBar";
// import {
//   addMoves,
//   clearMoves,
//   updateSettings,
//   getSiginUser,
// } from "../common/utils";
// import { useQuery, useMutation, gql } from "@apollo/client";
// import ThemeContext from "../contexts/theme-context";
// import styled from "styled-components";

// import "../stylesheets/containers/Problem.scss";
// import { ProblemData } from "../common/types";

// const CREATE_PROBLEM_RECORD = gql`
//   mutation CreateProblemRecord($problemRecord: ProblemRecordInput!) {
//     createProblemRecord(problemRecord: $problemRecord) {
//       id
//     }
//   }
// `;

// const CREATE_VIEWED_PROBLEM = gql`
//   mutation CreateViewedProblem($viewedProblem: ViewedProblemInput!) {
//     createViewedProblem(viewedProblem: $viewedProblem) {
//       id
//     }
//   }
// `;

// const GET_PROBLEMS_FOR_NEXT = gql`
//   query getProblems(
//     $tags: String!
//     $level: String!
//     $first: Int!
//     $after: String
//   ) {
//     problems(tags: $tags, level: $level, first: $first, after: $after) {
//       edges {
//         node {
//           id
//         }
//       }
//     }
//   }
// `;

// const GET_PROBLEM = gql`
//   query getProblem($id: ID!) {
//     moves @client
//     settings @client
//     problem(id: $id) {
//       id
//       steps
//       rank
//       whofirst
//       rightCount
//       wrongCount
//       name
//       problemAnswers {
//         id
//         answerType
//         steps
//       }
//     }
//   }
// `;

// const RightTip = styled.div`
//   font-size: 50vmin;
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   color: green;
//   pointer-events: none;
// `;

// const WrongTip = styled.div`
//   font-size: 50vmin;
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   color: red;
//   pointer-events: none;
// `;

// const Problem = () => {
//   const { search } = useLocation();
//   const history = useHistory();
//   const id = window.location.pathname.split("/").pop();
//   const query = new URLSearchParams(search);
//   const { data, loading, error } = useQuery(GET_PROBLEM, {
//     variables: { id },
//   });

//   const [createProblemRecord] = useMutation(CREATE_PROBLEM_RECORD);
//   const [createViewedProblem] = useMutation(CREATE_VIEWED_PROBLEM);

//   const [rightAnswers, setRightAnswers] = useState([]);
//   const [wrongAnswers, setWrongAnswers] = useState([]);
//   const [changeAnswers, setChangeAnswers] = useState([]);
//   const [levelRangeLow, setLevelRangeLow] = useState(
//     query.get("level")?.split("-")[0] || "18k"
//   );
//   const [levelRangeHigh, setLevelRangeHigh] = useState(
//     query.get("level")?.split("-")[1] || "6d"
//   );
//   const [problem, setProblem] = useState<ProblemData>();
//   const [settings, setSettings] = useState({
//     currentMode: "normal",
//   });
//   const [nextStoneType, setNextStoneType] = useState(1);
//   const [isRight, setIsRight] = useState(false);
//   const [isWrong, setIsWrong] = useState(false);
//   const [boardEditable, setBoardEditable] = useState(true);

//   const [moves, setMoves] = useState([]);
//   const { theme } = useContext(ThemeContext);

//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   const handleReset = () => {
//     clearMoves();
//     updateSettings({ currentAnswerId: 0 });
//     setIsRight(false);
//     setIsWrong(false);
//     setBoardEditable(true);
//   };

//   const handleRight = () => {
//     createProblemRecord({
//       variables: {
//         problemRecord: {
//           problemId: problem?.id,
//           recordType: "right",
//           userId: getSiginUser()?.id,
//         },
//       },
//     });
//     setIsRight(true);
//     setBoardEditable(false);
//   };

//   const handleWrong = () => {
//     createProblemRecord({
//       variables: {
//         problemRecord: {
//           problemId: problem?.id,
//           recordType: "wrong",
//           userId: getSiginUser()?.id,
//         },
//       },
//     });
//     setIsWrong(true);
//     setTimeout(() => {
//       handleReset();
//     }, 1000);
//   };

//   useEffect(() => {
//     if (!data) return;

//     setProblem(data.problem);
//     setSettings(data.settings);
//     setMoves(data.moves);
//     setNextStoneType(data.problem.whofirst[0] === "B" ? 1 : -1);

//     setRightAnswers(
//       data.problem.problemAnswers.filter((p: any) => p.answerType === 1)
//     );
//     setWrongAnswers(
//       data.problem.problemAnswers.filter((p: any) => p.answerType === 2)
//     );
//     setChangeAnswers(
//       data.problem.problemAnswers.filter((p: any) => p.answerType === 3)
//     );
//   }, [data]);

//   useEffect(() => {
//     handleReset();
//     if (!problem) return;
//     createViewedProblem({
//       variables: {
//         viewedProblem: {
//           problemId: problem?.id,
//           userId: getSiginUser()?.id,
//         },
//       },
//     });
//   }, [problem, createViewedProblem]);

//   const { data: nextProblemData, refetch: nextProblemRefetch } = useQuery(
//     GET_PROBLEMS_FOR_NEXT,
//     {
//       variables: {
//         first: 1,
//         tags: "all",
//         level: `${levelRangeLow}-${levelRangeHigh}`,
//       },
//     }
//   );

//   const response = (moves: Array<string>) => {
//     const rights: any = [];
//     const wrongs: any = [];

//     rightAnswers.forEach((i: any) => {
//       if (i.steps.indexOf(moves.join(";")) === 0) {
//         rights.push(i);
//       }
//     });
//     wrongAnswers.forEach((i: any) => {
//       if (i.steps.indexOf(moves.join(";")) === 0) {
//         wrongs.push(i);
//       }
//     });

//     if (rights.length > 0) {
//       const i = Math.floor(Math.random() * rights.length);
//       let stepsStr = moves.join(";");
//       if (rights[i].steps === stepsStr) {
//         handleRight();
//       } else {
//         const step = rights[i].steps.split(";")[moves.length];
//         addMoves([step]);

//         stepsStr = moves.concat([step]).join(";");

//         if (rights[i].steps === stepsStr) {
//           handleRight();
//         }
//       }
//     } else if (wrongs.length > 0) {
//       const i = Math.floor(Math.random() * wrongs.length);
//       let stepsStr = moves.join(";");
//       if (wrongs[i].steps === stepsStr) {
//         handleWrong();
//       } else {
//         const step = wrongs[i].steps.split(";")[moves.length];
//         addMoves([step]);

//         stepsStr = moves.concat([step]).join(";");

//         if (wrongs[i].steps === stepsStr) {
//           handleWrong();
//         }
//       }
//     } else {
//       handleWrong();
//     }
//   };

//   useEffect(() => {
//     if (problem && settings && moves && canvasRef.current) {
//       const { width, height } = window.screen;
//       const boardWidth =
//         width > height ? window.innerHeight - 60 : window.innerWidth;
//       if (canvasRef.current !== null) {
//         canvasRef.current.width = boardWidth;
//         canvasRef.current.height = boardWidth;
//       }

//       // const board = new Board({
//       //   autofit: true,
//       //   canvas: canvasRef.current,
//       //   showCoordinate: true,
//       //   editable: boardEditable,
//       //   theme: theme,
//       //   nextStoneType: nextStoneType,
//       //   afterMove: (step: string) => {
//       //     const moves = addMoves([step]);
//       //     setNextStoneType(-nextStoneType);
//       //     setTimeout(() => {
//       //       if (settings.currentMode !== "research") {
//       //         response(moves);
//       //       }
//       //       setNextStoneType(-nextStoneType);
//       //     }, 300);
//       //   },
//       // });
//       // const totalSteps = problem?.steps.split(";");
//       // board.setStones(CoordsToTree(totalSteps.concat(moves)));
//       // board.render();
//     }
//   }, [problem, settings, moves, nextStoneType, boardEditable, theme]);

//   if (loading) return <Spin />;
//   if (error) return <div>Error</div>;

//   return (
//     <Row gutter={[24, 0]}>
//       <Col>
//         <div className="problem-board">
//           <canvas style={{ width: "90vh", height: "90vh" }} ref={canvasRef} />
//           <RightTip>
//             <CheckOutlined className={`right-tip ${isRight ? "show" : ""}`} />
//           </RightTip>
//           <WrongTip>
//             <CloseOutlined className={`wrong-tip ${isWrong ? "show" : ""}`} />
//           </WrongTip>
//         </div>
//       </Col>
//       <Col flex="auto">
//         <div className="puzzle-panel">
//           <div className="title">
//             {`${problem?.whofirst} ${problem?.rank}`}&nbsp;&nbsp;
//             <button
//             // onClick={this.handleFavorite}
//             // className={`favorite ${this.state.is_favorite === true ? 'active' : ''}`}
//             // title={`${this.state.is_favorite === true ? 'Cancle Favorite' : 'Favorite'}`}
//             >
//               <i className="fa fa-heart bounceIn" aria-hidden="true" />
//             </button>
//           </div>
//           <div>
//             <strong>NO.:</strong>
//             {`P-${problem?.id}`}&nbsp;&nbsp;&nbsp;
//             <CheckOutlined />
//             <span>&nbsp;{problem?.rightCount}</span>&nbsp;&nbsp;
//             <CloseOutlined />
//             <span>&nbsp;{problem?.wrongCount}</span>&nbsp;&nbsp;
//           </div>

//           <div className="button-container">
//             <Button
//               style={{ marginRight: "10px" }}
//               onClick={handleReset}
//               type="primary">
//               Reset
//             </Button>
//             <Button
//               style={{ marginRight: "10px" }}
//               onClick={async () => {
//                 await nextProblemRefetch({
//                   first: 1,
//                   tags: "all",
//                   level: `${levelRangeLow}-${levelRangeHigh}`,
//                 });
//                 console.log("next", nextProblemData);
//                 history.push({
//                   pathname: `/problems/${nextProblemData?.problems.edges[0].node.id}`,
//                   search: `level=${levelRangeLow}-${levelRangeHigh}`,
//                 });
//               }}
//               type="ghost">
//               Next Problem
//             </Button>
//             {/* <Row>
//               <Col span={24}>
//                 <div className="addthis_inline_share_toolbox"></div>
//               </Col>
//             </Row> */}
//             <div className="level-range">
//               <RankList
//                 rank={levelRangeLow}
//                 placeholder="FROM"
//                 onChange={(val: string) => {
//                   setLevelRangeLow(val);
//                 }}
//               />
//               <MinusOutlined style={{ margin: "0 10px" }} />
//               <RankList
//                 rank={levelRangeHigh}
//                 placeholder="TO"
//                 onChange={(val: string) => {
//                   setLevelRangeHigh(val);
//                 }}
//               />
//             </div>
//             <Row style={{ margin: "20px 0" }}>
//               <Col span={20}>
//                 <label className="research-mode-label">Research Mode: </label>
//               </Col>
//               <Col span={4}>
//                 <Switch
//                   defaultChecked={settings.currentMode === "research"}
//                   onChange={() => {
//                     updateSettings({
//                       currentMode:
//                         settings.currentMode === "research"
//                           ? "normal"
//                           : "research",
//                     });
//                   }}
//                 />
//               </Col>
//             </Row>
//             <div>
//               <div>Right Answers</div>
//               {rightAnswers.map((a: any) => (
//                 <AnswerBar key={a.id} id={a.id} answer={a.steps} />
//               ))}
//               <div>Wrong Answers</div>
//               {wrongAnswers.map((a: any) => (
//                 <AnswerBar key={a.id} id={a.id} answer={a.steps} />
//               ))}
//               {changeAnswers.length > 0 && <div>Change Answers</div>}
//               {changeAnswers.map((a: any) => (
//                 <AnswerBar key={a.id} id={a.id} answer={a.steps} />
//               ))}
//             </div>
//           </div>
//         </div>
//       </Col>
//     </Row>
//   );
// };

// export default Problem;
