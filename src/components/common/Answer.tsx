import { useState, useEffect } from "react";
import { ReactSVG } from "react-svg";

import first from "assets/images/first.svg";
import play from "assets/images/play.svg";
import last from "assets/images/last.svg";
import like from "assets/images/like.svg";

const Answer = (data: any) => {
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(0);
  const onFirst = () => {};
  const onPrev = () => {};
  const onNext = () => {};
  const onLast = () => {};
  useEffect(() => {
    if (data) {
      setTotal(data.answer.attributes.steps.split(";").length);
    }
  }, [data]);
  return (
    <div className="flex flex-row items-center cursor-pointer mr-10">
      <div className="text-lg mr-2 w-10">
        {current}/{total}
      </div>
      <div className="w-8 p-2" onClick={onFirst}>
        <ReactSVG src={first} />
      </div>
      <div className="w-8 p-2" onClick={onPrev}>
        <ReactSVG className="transform rotate-180" src={play} />
      </div>
      <div className="w-8 p-2" onClick={onNext}>
        <ReactSVG src={play} />
      </div>
      <div className="w-8 p-2" onClick={onLast}>
        <ReactSVG src={last} />
      </div>
      {/* <div className="0 p-2" onClick={onLast}>
        <ReactSVG src={like} />
      </div> */}
    </div>
  );
};

export default Answer;
