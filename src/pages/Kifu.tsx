import { useState, useEffect, useCallback } from "react";
import GBan, { move as moveStone } from "gboard";
import styled from "styled-components";
import Avatar from "react-avatar";
import { useParams } from "react-router-dom";
import moment from "moment";

import { fetchKifu, selectKifu, selectUI } from "slices";
import { NumberParam, useQueryParam, withDefault } from "use-query-params";
import { KifuControls } from "components/common";
import { useDispatch, useTypedSelector, useGenericData, store } from "utils";
import { zeros, matrix, Matrix } from "mathjs";
import { sgfToPosition } from "../common/Helper";
import { createViewedKifus } from "slices/viewedSlice";

interface ParamTypes {
  id: string;
}

const KifuBoard = styled.div``;
const board = new GBan();

let mats: Map<number, Matrix> = new Map();
const Kifu = () => {
  const dispatch = useDispatch();
  const { token } = useTypedSelector((i) => i.auth);
  const { id } = useParams<ParamTypes>();
  const [kifu] = useGenericData(useTypedSelector((state) => selectKifu(state)));
  const { theme, coordinates } = useTypedSelector((state) => selectUI(state));
  const [mat, setMat] = useState<Matrix>(matrix(zeros([19, 19])));
  const [marks, setMarks] = useState<Matrix>(matrix(zeros([19, 19])));
  const [move, setMove] = useQueryParam("move", withDefault(NumberParam, 0));

  const boardRef = useCallback((node) => {
    mats.set(0, matrix(zeros([19, 19])));
    if (node !== null) {
      console.log("init");
      board.init(node);
    }
  }, []);

  let moves_count = 0;
  let b_name_en;
  let w_name_en;
  let b_rank;
  let w_rank;
  let date;
  let komi;
  let result;
  if (kifu && kifu.data.attributes) {
    moves_count = kifu.data.attributes.moves_count;
    b_name_en = kifu.data.attributes.b_name_en;
    w_name_en = kifu.data.attributes.w_name_en;
    b_rank = kifu.data.attributes.b_rank;
    w_rank = kifu.data.attributes.w_rank;
    date = kifu.data.attributes.date;
    komi = kifu.data.attributes.komi;
    result = kifu.data.attributes.result;
  }

  const handleNext = () => {
    if (move < moves_count) {
      setMove(move + 1);
    }
  };

  const handlePrev = () => {
    if (move > 1) {
      setMove(move - 1);
    }
  };

  const handleFastPrev = () => {
    move > 10 ? setMove(move - 10) : setMove(1);
  };

  const handleFastNext = () => {
    move < moves_count - 10 ? setMove(move + 10) : setMove(moves_count);
  };

  const handleFirst = () => {
    setMove(1);
  };

  const handleLast = () => {
    setMove(moves_count);
  };

  useEffect(() => {
    dispatch(fetchKifu({ pattern: { id } }));
    dispatch(createViewedKifus({ data: { record: { kifu_id: id } } }));
    mats = new Map();
  }, [dispatch, id, token]);

  useEffect(() => {
    // TODO: There is a performance issue
    const keyDownEvent = (event: KeyboardEvent) => {
      const keyName = event.key;
      if (keyName === "Shift" || keyName === "Alt") return;
      if (event.shiftKey) {
        if (keyName === "ArrowLeft") handleFastPrev();
        if (keyName === "ArrowRight") handleFastNext();
      } else if (event.altKey) {
        if (keyName === "ArrowLeft") handleFirst();
        if (keyName === "ArrowRight") handleLast();
      } else {
        if (keyName === "ArrowLeft") handlePrev();
        if (
          keyName === "ArrowRight" ||
          keyName === " " ||
          keyName === "Enter"
        ) {
          handleNext();
        }
      }
    };
    document.addEventListener("keydown", keyDownEvent, false);
    return () => {
      document.removeEventListener("keydown", keyDownEvent, false);
    };
  });

  useEffect(() => {
    console.log("render");
    const padding = coordinates ? 30 : 10;
    board.setOptions({ coordinates, padding });
    board.setTheme(theme, mat, marks);
    board.render(mat, marks);
  }, [mat, theme, coordinates, marks]);

  useEffect(() => {
    if (kifu && move > 0) {
      const { steps, moves_count } = kifu.data.attributes;
      if (move > moves_count) return;
      const index = move - 1;
      const { x, y, ki } = sgfToPosition(steps.split(";")[index]);
      let mat = mats.get(move);
      if (mat) {
        const newMat = moveStone(mat, x, y, ki);
        setMat(newMat);
        mats.set(move, newMat);
        mat = mats.get(index);
      } else {
        mat = matrix(zeros([19, 19]));
        let newMat = matrix(zeros([19, 19]));
        for (let i = 0; i < move; i++) {
          const { x, y, ki } = sgfToPosition(steps.split(";")[i]);
          newMat = moveStone(mat, x, y, ki);
          mats.set(i + 1, newMat);
          mat = newMat;
        }
        setMat(newMat);
      }
      let marks = matrix(zeros([19, 19]));
      marks.set([x, y], ki);
      setMarks(marks);
    }
  }, [move, kifu]);

  return (
    <div className="flex flex-col lg:flex-row">
      <KifuBoard
        className="board"
        id="kifu-board"
        ref={boardRef}
        onClick={handleNext}
      />
      <div className="flex -ml-2 lg:hidden mb-3 justify-center">
        <KifuControls
          onFirst={handleFirst}
          onFastPrev={handleFastPrev}
          onPrev={handlePrev}
          onNext={handleNext}
          onFastNext={handleFastNext}
          onLast={handleLast}
        />
      </div>
      <div className="flex flex-row justify-around flex-1 px-2 lg:p-4 lg:pl-10 lg:flex-col lg:justify-start">
        <div className="flex flex-row">
          <div>
            <div>
              <Avatar name={b_name_en} size={"5rem"} />
            </div>
            <div className="text-base mt-2">
              <span className="inline-block rounded-full h-3 w-3 bg-black mr-0.5" />
              {b_name_en}({b_rank})
            </div>
          </div>
          <div className="ml-10">
            <div>
              <Avatar name={w_name_en} size={"5rem"} />
            </div>
            <div className="text-base mt-2">
              <span className="inline-block rounded-full h-3 w-3 bg-white border border-black mr-0.5" />
              {w_name_en}({w_rank})
            </div>
          </div>
        </div>
        <div className="text-base">
          <p className="my-1 mt-3">Date: {moment(date).format("YYYY-MM-DD")}</p>
          <p className="my-1">Komi: {komi}</p>
          <p className="my-1">Result: {result}</p>
        </div>
        <div className="hidden -ml-2 mt-4 lg:block">
          <KifuControls
            onFirst={handleFirst}
            onFastPrev={handleFastPrev}
            onPrev={handlePrev}
            onNext={handleNext}
            onFastNext={handleFastNext}
            onLast={handleLast}
          />
        </div>
      </div>
    </div>
  );
};

export default Kifu;
