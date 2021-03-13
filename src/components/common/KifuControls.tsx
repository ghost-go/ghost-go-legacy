import { ReactSVG } from "react-svg";

import first from "assets/images/first.svg";
import rewind from "assets/images/rewind.svg";
import play from "assets/images/play.svg";
import fast from "assets/images/fast-forward.svg";
import last from "assets/images/last.svg";

const KifuControls = ({
  onNext,
  onPrev,
  onFirst,
  onLast,
  onFastNext,
  onFastPrev,
}: {
  onNext: () => void;
  onPrev: () => void;
  onFirst: () => void;
  onLast: () => void;
  onFastNext: () => void;
  onFastPrev: () => void;
}) => {
  return (
    <div className="flex flex-row items-center cursor-pointer">
      <div className="w-10 p-3" onClick={onFirst}>
        <ReactSVG src={first} />
      </div>
      <div className="w-11 p-3" onClick={onFastPrev}>
        <ReactSVG src={rewind} />
      </div>
      <div className="w-10 p-3" onClick={onPrev}>
        <ReactSVG className="transform rotate-180" src={play} />
      </div>
      <div className="w-10 p-3" onClick={onNext}>
        <ReactSVG src={play} />
      </div>
      <div className="w-11 p-3" onClick={onFastNext}>
        <ReactSVG src={fast} />
      </div>
      <div className="w-10 p-3" onClick={onLast}>
        <ReactSVG src={last} />
      </div>
    </div>
  );
};

export default KifuControls;
