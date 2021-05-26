import {useState, useEffect} from 'react';
import {ReactSVG} from 'react-svg';

import {uiSlice} from 'slices';
import {useDispatch, useTypedSelector} from 'utils';
import {Icon} from 'semantic-ui-react';

const Answer = ({data}: {data: any}) => {
  const dispatch = useDispatch();
  const answerMove = useTypedSelector(i => i.ui.answerMove);
  const answer = useTypedSelector(i => i.ui.answer);
  const [total, setTotal] = useState(0);
  const [move, setMove] = useState(0);

  const {setAnswer, setAnswerMove} = uiSlice.actions;
  const onFirst = () => {
    dispatch(setAnswer(data));
    dispatch(setAnswerMove(1));
  };
  const onPrev = () => {
    if (move > 1) {
      dispatch(setAnswer(data));
      dispatch(setAnswerMove(move - 1));
    }
  };
  const onNext = () => {
    if (move < total) {
      dispatch(setAnswer(data));
      dispatch(setAnswerMove(move + 1));
    }
  };
  const onLast = () => {
    dispatch(setAnswer(data));
    dispatch(setAnswerMove(total));
  };
  useEffect(() => {
    if (data) {
      setTotal(data.attributes.steps.split(';').length);
    }
  }, [data]);

  useEffect(() => {
    if (answer && data && answerMove) {
      setMove(answer.id === data.id ? answerMove : 0);
    } else {
      setMove(0);
    }
  }, [answer, answerMove, data]);

  return (
    <div className="flex flex-row items-center cursor-pointer mr-10 select-none">
      <div className="text-lg mr-1">
        [{move}/{total}]
      </div>
      <Icon className="mx-4" name="step backward" onClick={onFirst} />
      <Icon
        className="mx-4"
        name="play"
        flipped={'horizontally'}
        onClick={onPrev}
      />
      <Icon className="mx-4" name="play" onClick={onNext} />
      <Icon className="mx-4" name="step forward" onClick={onLast} />
      {/* <div className="0 p-2" onClick={onLast}>
        <ReactSVG src={like} />
      </div> */}
    </div>
  );
};

export default Answer;
