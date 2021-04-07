import { Tag } from "components/common";
import { useDispatch } from "utils";

const LEVEL_LIST = ["18k-10k", "10k-5k", "5k-3k", "3k-1d", "1d-3d", "3d-6d"];

const ProblemFilterPanel = ({
  visible,
  tags,
  activeLevel,
  activeTags,
  setLevelParam,
  setTagsParam,
  setVisible,
}: {
  visible: boolean;
  tags: any;
  activeLevel: string;
  activeTags: string;
  setLevelParam: (l: string) => void;
  setTagsParam: (t: string) => void;
  setVisible: (v: boolean) => void;
}) => {
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
          active={activeLevel === "all"}
          onClick={() => {
            setLevelParam("all");
            setVisible(false);
          }}>
          all
        </Tag>
        {LEVEL_LIST.map((l) => (
          <Tag
            key={l}
            active={activeLevel === l}
            onClick={() => {
              setLevelParam(l);
              setVisible(false);
            }}>
            {l}
          </Tag>
        ))}
      </div>
      <div>
        <div className="block font-semibold text-gray-400 mb-2">TAGS</div>
        <Tag
          key={`t-all`}
          active={activeTags === "all"}
          onClick={() => {
            setTagsParam("all");
            setVisible(false);
          }}>
          all
        </Tag>
        {tags &&
          tags.data.map(({ attributes: { name } }: any) => (
            <Tag
              key={`t-${name}`}
              active={activeTags === name}
              onClick={() => {
                setTagsParam(name);
                setVisible(false);
              }}>
              {name}
            </Tag>
          ))}
      </div>
    </div>
  );
};

export default ProblemFilterPanel;
