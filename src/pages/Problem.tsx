import _ from "lodash";
import { useState, useEffect, useCallback, useRef } from "react";
import GBan, { move as moveStone, canMove } from "gboard";
import { ReactSVG } from "react-svg";
import { Router, useParams } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import moment from "moment";
import edit from "assets/images/edit.svg";
import animWrong from "assets/images/anim-wrong.svg";
import animRight from "assets/images/anim-right.svg";
import { useHistory } from "react-router";
import { Switch } from "components/common";
import { Helmet } from "react-helmet";
import * as Toast from "utils/toast";
import {
  FacebookIcon,
  FacebookShareCount,
  FacebookShareButton,
  TwitterShareButton,
  RedditShareCount,
  VKShareCount,
} from "react-share";

import {
  fetchProblem,
  selectProblem,
  selectUI,
  selectTags,
  fetchTags,
  uiSlice,
  openCommentsSlice,
  createViewedProblems,
  fetchProblemNext,
  createRecord,
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
import { ProblemFilterPanel, AnswerSection } from "components/common";
import styled from "styled-components";
import { SGF_LETTERS } from "common/Constants";
import {
  Accordion,
  Icon,
  Header,
  Rating,
  Button,
  Label,
  Sidebar,
  Segment,
  Comment,
  Form,
  Menu,
} from "semantic-ui-react";
import CommentsSidebar from "components/CommentsSidebar";

interface ParamTypes {
  id: string;
}

const ProblemBoard = styled.div``;
const board = new GBan({ zoom: true, interactive: true });
let rightAns: any = [];
let wrongAns: any = [];
let changeAns: any = [];
let pendingRightAns: any = [];
let pendingWrongAns: any = [];
let rightPath: string[] = [];
let wrongPath: string[] = [];
let changePath: string[] = [];

const Problem = () => {
  const dispatch = useDispatch();
  const { token } = useTypedSelector((i) => i.auth);
  const ref = useRef<HTMLDivElement>(null);
  const { id } = useParams<ParamTypes>();
  const [tags] = useGenericData(useTypedSelector((state) => selectTags(state)));
  const history = useHistory();
  const [problem] = useGenericData(
    useTypedSelector((state) => selectProblem(state))
  );
  const [activeIndex, setActiveIndex] = useState();
  const { theme, coordinates } = useTypedSelector((state) => selectUI(state));
  const open = useTypedSelector((state) => state.openComments);
  const [initMat, setInitMat] = useState<Matrix>(matrix(zeros([19, 19])));
  const [mat, setMat] = useState<Matrix>(matrix(zeros([19, 19])));
  const [marks, setMarks] = useState<Matrix>(matrix(zeros([19, 19])));
  const [levelParam = "all", setLevelParam] = useQueryParam<string>("level");
  const [tagsParam = "all", setTagsParam] = useQueryParam<string>("tags");
  const [nextMove, setNextMove] = useState<number>(1);
  const [currentPath, setCurrentPath] = useState<string>("");
  const [rightVisible, setRightVisible] = useState<boolean>(false);
  const [wrongVisible, setWrongVisible] = useState<boolean>(false);
  const [interactive, setInteractive] = useState<boolean>(true);
  const [researchMode, setResearchMode] = useState<boolean>(false);
  const [filter, setFilter] = useState<boolean>(false);
  const [move, setMove] = useState<number>(0);

  const answerMove = useTypedSelector((i) => i.ui.answerMove);
  const answer = useTypedSelector((i) => i.ui.answer);

  const op = useSpring<any>({ opacity: 1, from: { opacity: 0 } });

  const boardRef = useCallback((node) => {
    if (node !== null) {
      console.log("init");
      board.init(node);
      board.render();
    }
  }, []);

  const makeWrong = () => {
    setRightVisible(false);
    setWrongVisible(true);
    setInteractive(false);
    dispatch(
      createRecord({
        data: {
          record: {
            problem_id: id,
            kind: "wrong",
          },
        },
      })
    );
    setTimeout(() => {
      handleReset();
      setInteractive(true);
    }, 1000);
  };

  const makeRight = () => {
    setRightVisible(true);
    setWrongVisible(false);
    setInteractive(false);
    dispatch(
      createRecord({
        data: {
          record: {
            problem_id: id,
            kind: "right",
          },
        },
      })
    );
  };
  const makeChange = () => {
    console.log("Make Change");
  };

  const handleMove = (
    mat: Matrix,
    i: number,
    j: number,
    next: number,
    ans: string,
    cb: () => void
  ) => {
    if (canMove(mat, i, j, next)) {
      const newMat = moveStone(mat, i, j, next);
      const move = `${next > 0 ? "B" : "W"}[${
        SGF_LETTERS[i] + SGF_LETTERS[j]
      }]`;

      let marks = matrix(zeros([19, 19]));
      marks.set([i, j], next);
      setMarks(marks);

      setNextMove(-next);
      setMat(newMat);
      setCurrentPath((path) => {
        const newPath = path === "" ? move : path + ";" + move;
        if (newPath === ans) cb();
        return newPath;
      });
    } else {
      console.log("cannot move");
    }
  };

  const handleResponse = (
    mat: Matrix,
    paths: string[],
    path: string,
    cb: () => void
  ) => {
    const ans = _.sample(paths);
    if (paths.filter((i) => i === path).length > 0) cb();
    if (ans) {
      let result = ans
        .replace(`${path}`, "")
        .split(";")
        .filter((i) => i.length > 0)[0];
      if (result && result !== "") {
        const next = result[0] === "B" ? 1 : -1;
        const i = SGF_LETTERS.indexOf(result[2]);
        const j = SGF_LETTERS.indexOf(result[3]);
        handleMove(mat, i, j, next || nextMove, ans, cb);
      }
    }
  };

  const handleNext = () => {
    dispatch(
      fetchProblemNext({
        params: {
          level: levelParam,
          tags: tagsParam,
        },
      })
    ).then((res) => {
      if (res.type === "problems/fetchProblemNext/fulfilled") {
        const payload: any = res.payload;
        console.log("pay", res.payload);
        if (payload.data.data) {
          history.push({
            pathname: `/problems/${payload.data.data.id}`,
            search: window.location.search,
          });
        } else {
          Toast.info("No new problem.");
        }
      }
    });
  };

  const genMove = (mat: Matrix, path: string) => {
    const rightPaths = rightPath.filter((i) => i.startsWith(path));
    const changePaths = changePath.filter((i) => i.startsWith(path));
    const wrongPaths = wrongPath.filter((i) => i.startsWith(path));

    console.log("path", path);
    console.log(
      "r,c,w",
      rightPaths.length,
      changePaths.length,
      wrongPaths.length
    );

    if (rightPaths.length > 0) {
      handleResponse(mat, rightPaths, path, () => {
        makeRight();
      });
    } else if (changePaths.length > 0) {
      handleResponse(mat, changePaths, path, () => {
        makeChange();
      });
    } else if (wrongPaths.length > 0) {
      handleResponse(mat, wrongPaths, path, () => {
        makeWrong();
      });
    } else {
      makeWrong();
    }
  };

  const handleReset = () => {
    setCurrentPath("");
    setRightVisible(false);
    setWrongVisible(false);
    setNextMove(problem.data.attributes.turn);
    setMarks(matrix(zeros([19, 19])));
    setMat(initMat);
    setInteractive(true);
    dispatch(uiSlice.actions.resetAnswer());
    dispatch(uiSlice.actions.resetAnswerMove());
  };

  const handleActiveIndexChange = (e: any, titleProps: any) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    setCurrentPath("");
    dispatch(fetchTags());
    dispatch(fetchProblem({ pattern: { id: id } }));
    dispatch(createViewedProblems({ data: { record: { problem_id: id } } }));
  }, [dispatch, id]);

  useEffect(() => {
    if (answer && answerMove) {
      setResearchMode(true);
      const moves = answer.attributes.steps.split(";").slice(0, answerMove);
      let newMat = initMat;
      let marks = matrix(zeros([19, 19]));
      moves.forEach((move: string) => {
        const nextMove = move[0] === "B" ? 1 : -1;
        const i = SGF_LETTERS.indexOf(move[2]);
        const j = SGF_LETTERS.indexOf(move[3]);
        if (canMove(newMat, i, j, nextMove)) {
          newMat = moveStone(newMat, i, j, nextMove);
          marks = matrix(zeros([19, 19]));
          marks.set([i, j], nextMove);
        }
        setMarks(marks);
        setNextMove(-nextMove);
        setMat(newMat);
      });
    }
  }, [answer, answerMove, initMat]);

  useEffect(() => {
    setRightVisible(false);
    setWrongVisible(false);
    setMarks(matrix(zeros([19, 19])));
    setResearchMode(false);
    setInteractive(true);
    dispatch(uiSlice.actions.resetAnswer());
    dispatch(uiSlice.actions.resetAnswerMove());
  }, [dispatch]);

  useEffect(() => {
    if (board) {
      board.nextMove = nextMove;
    }
  }, [nextMove]);

  useEffect(() => {
    board.setInteractive(interactive);
  }, [interactive]);

  useOutsideClick(ref, () => {
    if (filter) setFilter(false);
  });

  useEffect(() => {
    console.log("render");
    const padding = coordinates ? 30 : 10;
    board.setOptions({ coordinates, padding });
    board.setTheme(theme, mat, marks);
    board.render(mat, marks);
  }, [mat, theme, marks, coordinates]);

  useEffect(() => {
    if (problem) {
      const { steps, turn } = problem.data.attributes;
      const moves = steps.split(";");
      let newMat = matrix(zeros([19, 19]));
      moves.forEach((move: string) => {
        const { x, y, ki } = sgfToPosition(move);
        newMat = moveStone(newMat, x, y, ki);
      });
      // reset
      setNextMove(turn);
      setRightVisible(false);
      setWrongVisible(false);
      setMarks(matrix(zeros([19, 19])));
      setResearchMode(false);
      setInteractive(true);
      dispatch(uiSlice.actions.resetAnswer());
      dispatch(uiSlice.actions.resetAnswerMove());

      setInitMat(newMat);
      setMat(newMat);
      rightAns = problem.included.filter(
        (i: any) =>
          i.type === "problem_answer" && i.attributes.answer_type === 1
      );
      rightPath = rightAns.map((i: any) => i.attributes.steps);
      wrongAns = problem.included.filter(
        (i: any) =>
          i.type === "problem_answer" && i.attributes.answer_type === 2
      );
      wrongPath = wrongAns.map((i: any) => i.attributes.steps);
      changeAns = problem.included.filter(
        (i: any) =>
          i.type === "problem_answer" && i.attributes.answer_type === 3
      );
      changePath = changeAns.map((i: any) => i.attributes.steps);
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
          <Helmet>
            <meta
              name="og:image"
              property="og:image"
              content={problem.data.attributes.image_url}
            />
            <title>Problem - P-{problem.data.id}</title>
          </Helmet>
          <div className="relative">
            <ProblemBoard
              ref={boardRef}
              className="board"
              id="problem-board"
              onClick={() => {
                if (interactive) {
                  const i = board.cursor[0];
                  const j = board.cursor[1];
                  if (canMove(mat, i, j, nextMove)) {
                    const newMat = moveStone(mat, i, j, nextMove);
                    const move = `${nextMove > 0 ? "B" : "W"}[${
                      SGF_LETTERS[i] + SGF_LETTERS[j]
                    }]`;

                    let marks = matrix(zeros([19, 19]));
                    marks.set([i, j], nextMove);
                    setMarks(marks);
                    setNextMove(-nextMove);
                    setMat(newMat);
                    if (!researchMode) {
                      setCurrentPath((path) => {
                        const newPath = path === "" ? move : path + ";" + move;
                        genMove(newMat, newPath);
                        return newPath;
                      });
                    }
                  }
                }
              }}
            />
            <ReactSVG
              className={`mark ${rightVisible ? "block" : "hidden"}`}
              src={animRight}
            />
            <ReactSVG
              className={`mark ${wrongVisible ? "block" : "hidden"}`}
              src={animWrong}
            />
          </div>
          <div ref={ref}>
            <ProblemFilterPanel
              visible={filter}
              activeLevel={levelParam}
              activeTags={tagsParam}
              setLevelParam={setLevelParam}
              setTagsParam={setTagsParam}
              setVisible={setFilter}
              tags={tags}
            />
          </div>
          <div
            className="flex flex-1 p-4 flex-col text-gray-800 lg:pl-6 lg:pt-4"
            style={op}>
            <Header size="huge">
              <span>
                {problem.data.attributes.turn === -1
                  ? "White to move"
                  : "Black to move"}
              </span>
              <span className="ml-2">{problem.data.attributes.rank}</span>
            </Header>
            <div>
              <span className="mr-2">
                <Icon name="puzzle" />
                ID: P-{problem.data.id}
              </span>
              <span className="mr-2">
                <Icon name="checkmark" />
                {problem.data.attributes.rights_count}
              </span>
              <span className="mr-2">
                <Icon name="times" />
                {problem.data.attributes.wrongs_count}
              </span>
            </div>
            <div className="flex flex-row mt-4 items-center">
              <Button onClick={handleReset}>
                <Icon name="redo" />
                Reset
              </Button>
              <Button color="black" onClick={handleNext}>
                Next Problem
              </Button>
              <div
                className="flex flex-row items-center self-end cursor-pointer"
                onClick={() => {
                  setFilter(!filter);
                }}>
                <ReactSVG className="h-3 w-3 mr-0.5" src={edit} />
                <span className="underline">
                  {levelParam}/{tagsParam}
                </span>
              </div>
            </div>
            {/* <div>
              <div className="inline-block mt-4">
                <Button as="div" labelPosition="right">
                  <Button basic color="red">
                    <Icon name="heart" />
                    Like
                  </Button>
                  <Label as="a" basic color="red" pointing="left">
                    0
                  </Label>
                </Button>
                <Button.Group>
                  <Button basic attached icon={true}>
                    <Icon name="thumbs up outline" />
                  </Button>
                  <Button basic attached icon={true}>
                    <Icon name="thumbs down outline" />
                  </Button>
                </Button.Group>
              </div>
            </div> */}
            <div>
              <div className="inline-block mt-4">
                {/* <Button size="tiny" color="red" icon={true}>
                  <Icon name="star" />
                </Button> */}
                {/* <Button size="tiny" as="div" labelPosition="right">
                  <Button size="tiny" color="red">
                    <Icon name="heart" />
                    Like
                  </Button>
                  <Label as="a" basic color="red" pointing="left">
                    2048
                  </Label>
                </Button>
                <Icon name="thumbs up outline" />
                <Icon name="thumbs down outline" /> */}
                {/* <Button
                  size="tiny"
                  as="div"
                  labelPosition="right"
                  onClick={() => {
                    dispatch(openCommentsSlice.actions.toggle());
                  }}>
                  <Button size="tiny" color="blue">
                    <Icon name="comment" />
                    Comments
                  </Button>
                  <Label as="a" basic color="blue" pointing="left">
                    2048
                  </Label>
                </Button> */}
              </div>
              <div className="inline-block mt-4">
                <FacebookShareButton
                  // url={window.location.href}
                  url={`https://sandbox.ghost-go.com${window.location.pathname}`}
                  quote={`Problem - P-${problem.data.id}`}>
                  <FacebookIcon size={32} />
                </FacebookShareButton>

                <div>
                  <FacebookShareCount
                    url={window.location.href}
                    className="Demo__some-network__share-count">
                    {(count) => count}
                  </FacebookShareCount>
                </div>
                <Button.Group>
                  <Button icon color="twitter">
                    <Icon name="twitter" />
                  </Button>
                  <Button color="google plus" icon>
                    <Icon name="google plus" />
                  </Button>
                  <Button color="instagram" icon>
                    <Icon name="instagram" />
                  </Button>
                </Button.Group>
              </div>
              {/* <Rating
                icon="star"
                size="massive"
                defaultRating={0}
                maxRating={5}
              /> */}
            </div>
            <Header as="a" dividing>
              <Icon name="book" />
              Answers
            </Header>
            <div className="-mt-2 mb-2">
              <Switch
                label="Research Mode: "
                labelClassName="text-lg text-gray-600 font-semibold select-none cursor-pointer"
                onClick={() => {
                  setResearchMode(!researchMode);
                }}
                checked={researchMode}
              />
            </div>
            <Accordion fluid styled>
              <Accordion.Title
                active={activeIndex === 0}
                index={0}
                onClick={handleActiveIndexChange}>
                <Icon name="dropdown" />
                {`Right Answers(${rightAns.length})`}
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 0}>
                <AnswerSection answers={rightAns} />
              </Accordion.Content>
              {wrongAns.length > 0 && (
                <>
                  <Accordion.Title
                    active={activeIndex === 1}
                    index={1}
                    onClick={handleActiveIndexChange}>
                    <Icon name="dropdown" />
                    {`Wrong Answers(${wrongAns.length})`}
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex === 1}>
                    <AnswerSection answers={wrongAns} />
                  </Accordion.Content>
                </>
              )}
              {changeAns.length > 0 && (
                <>
                  <Accordion.Title
                    active={activeIndex === 2}
                    index={2}
                    onClick={handleActiveIndexChange}>
                    <Icon name="dropdown" />
                    {`Change Answers(${changeAns.length})`}
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex === 2}>
                    <AnswerSection answers={changeAns} />
                  </Accordion.Content>
                </>
              )}
              {pendingRightAns.length > 0 && (
                <>
                  <Accordion.Title
                    active={activeIndex === 2}
                    index={2}
                    onClick={handleActiveIndexChange}>
                    <Icon name="dropdown" />
                    {`Pending Right Answers(${pendingRightAns.length})`}
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex === 2}>
                    <AnswerSection answers={pendingRightAns} />
                  </Accordion.Content>
                </>
              )}
              {pendingWrongAns.length > 0 && (
                <>
                  <Accordion.Title
                    active={activeIndex === 2}
                    index={2}
                    onClick={handleActiveIndexChange}>
                    <Icon name="dropdown" />
                    {`Pending Wrong Answers(${pendingWrongAns.length})`}
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex === 2}>
                    <AnswerSection answers={pendingWrongAns} />
                  </Accordion.Content>
                </>
              )}
            </Accordion>
          </div>
          <CommentsSidebar />
        </div>
      )}
    </div>
  );
};

export default animated(Problem);
