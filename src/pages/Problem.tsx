import _ from "lodash";
import { useState, useEffect, useCallback, useRef } from "react";
import GBan, { move as moveStone, canMove } from "gboard";
import { ReactSVG } from "react-svg";
import { useParams } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import { Spring } from "react-spring/renderprops";
import moment from "moment";
import right from "assets/images/right.svg";
import wrong from "assets/images/wrong.svg";
import edit from "assets/images/edit.svg";
import animWrong from "assets/images/anim-wrong.svg";
import animRight from "assets/images/anim-right.svg";
import { Switch } from "components/common";

import {
  fetchProblem,
  selectProblem,
  selectUI,
  selectTags,
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
import { ProblemFilterPanel, Answer, AnswerSection } from "components/common";
import styled from "styled-components";
import { SGF_LETTERS } from "common/Constants";

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
  const ref = useRef<HTMLDivElement>(null);
  const { id } = useParams<ParamTypes>();
  const [tags] = useGenericData(useTypedSelector((state) => selectTags(state)));
  const [problem] = useGenericData(
    useTypedSelector((state) => selectProblem(state))
  );
  const { theme, coordinates } = useTypedSelector((state) => selectUI(state));
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
  const [move, setMove] = useState<number>();

  const props = useSpring<any>({ x: 100, from: { x: 0 } });
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
    setTimeout(() => {
      handleReset();
      setInteractive(true);
    }, 1000);
  };

  const makeRight = () => {
    setRightVisible(true);
    setWrongVisible(false);
    setInteractive(false);
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
  };

  useEffect(() => {
    setCurrentPath("");
    dispatch(fetchTags());
    dispatch(fetchProblem({ pattern: { id: id } }));
  }, [dispatch, id]);

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
      setNextMove(turn);
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
              setLevelParam={setLevelParam}
              setTagsParam={setTagsParam}
              setVisible={setFilter}
              tags={tags}
            />
          </div>
          <div
            className="flex flex-1 p-4 flex-col text-gray-800 lg:pl-8 lg:pt-10"
            style={op}>
            <div className="text-3xl font-bold">
              {problem.data.attributes.turn === -1
                ? "White to move"
                : "Black to move"}
              <span className="ml-2">{problem.data.attributes.rank}</span>
            </div>
            <div className="text-base mt-5 flex flex-row items-center text-gray-600">
              <span>ID: P-{problem.data.id}</span>
              <span>
                <ReactSVG className="w-5 h-5 ml-3" src={right} />
              </span>
              <span className="ml-1">
                {problem.data.attributes.right_count}
              </span>
              <span>
                <ReactSVG className="w-3.5 h-3.5 ml-3" src={wrong} />
              </span>
              <span className="ml-1">
                {problem.data.attributes.wrong_count}
              </span>
            </div>
            <div className="flex flex-row mt-5 items-center">
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 mr-3"
                onClick={handleReset}>
                Reset
              </button>
              <button className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 mr-3">
                Next Problem
              </button>
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
            <div className="mt-3">
              <Switch
                label="Research Mode: "
                labelClassName="text-lg text-gray-600 font-semibold"
                onClick={() => {
                  setResearchMode(!researchMode);
                }}
                checked={researchMode}
              />
            </div>
            <div className="text-base">
              <AnswerSection title="Right Answers" answers={rightAns} />
              {wrongAns.length > 0 && (
                <AnswerSection title="Wrong Answers" answers={wrongAns} />
              )}
              {changeAns.length > 0 && (
                <AnswerSection title="Change Answers" answers={changeAns} />
              )}
              {pendingRightAns.length > 0 && (
                <AnswerSection
                  title="Pending Right Answers"
                  answers={pendingRightAns}
                />
              )}
              {pendingWrongAns.length > 0 && (
                <AnswerSection
                  title="Pending Wrong Answers"
                  answers={pendingWrongAns}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default animated(Problem);
