import { Tag } from "components/common";
import { useDispatch } from "utils";
import { closeProblemFilterVisible } from "slices";

const LEVEL_LIST = ["18k-10k", "10k-5k", "5k-3k", "3k-1d", "1d-3d", "3d-6d"];

const ProblemFilterPanel = ({
  visible,
  tags,
  setLevelParam,
  setTagsParam,
}: {
  visible: boolean;
  tags: any;
  setLevelParam: (l: string) => void;
  setTagsParam: (t: string) => void;
}) => {
  const dispatch = useDispatch();
  return (
    <div
      className={`absolute transition transform origin-top-left ${
        visible
          ? "scale-100 opacity-1"
          : "scale-50 opacity-0 pointer-events-none"
      } bg-white shadow-md rounded-sm max-w-full lg:max-w-2xl z-10 p-2 border mx-2.5 lg:mx-1`}>
      <div>
        <div className="block font-semibold text-gray-400 mb-2">LEVEL</div>
        <Tag
          key={`level-all`}
          onClick={() => {
            setLevelParam("all");
            dispatch(closeProblemFilterVisible());
          }}>
          all
        </Tag>
        {LEVEL_LIST.map((l) => (
          <Tag
            key={l}
            onClick={() => {
              setLevelParam(l);
              dispatch(closeProblemFilterVisible());
            }}>
            {l}
          </Tag>
        ))}
      </div>
      <div>
        <div className="block font-semibold text-gray-400 mb-2">TAGS</div>
        <Tag
          key={`t-all`}
          onClick={() => {
            setTagsParam("all");
            dispatch(closeProblemFilterVisible());
          }}>
          all
        </Tag>
        {tags &&
          tags.data.map(({ attributes: { name } }: any) => (
            <Tag
              key={`t-${name}`}
              onClick={() => {
                setTagsParam(name);
                dispatch(closeProblemFilterVisible());
              }}>
              {name}
            </Tag>
          ))}
      </div>
    </div>
  );
};

export default ProblemFilterPanel;
