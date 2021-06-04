import {Tag} from 'components/common';
import {useDispatch} from 'utils';

const LEVEL_LIST = ['18k-10k', '10k-5k', '5k-3k', '3k-1d', '1d-3d', '3d-6d'];

const ProblemFilterPanel = ({
  tags,
  activeLevel,
  activeTags,
  setLevelParam,
  setTagsParam,
}: {
  tags: any;
  activeLevel: string;
  activeTags: string;
  setLevelParam: (l: string) => void;
  setTagsParam: (t: string) => void;
}) => {
  return (
    <div>
      <div>
        <div className="block font-semibold text-gray-400 mb-2">LEVEL</div>
        <Tag
          key={'level-all'}
          active={activeLevel === 'all'}
          onClick={() => {
            setLevelParam('all');
          }}
        >
          all
        </Tag>
        {LEVEL_LIST.map(l => (
          <Tag
            key={l}
            active={activeLevel === l}
            onClick={() => {
              setLevelParam(l);
            }}
          >
            {l}
          </Tag>
        ))}
      </div>
      <div>
        <div className="block font-semibold text-gray-400 mb-2">TAGS</div>
        <Tag
          key={'t-all'}
          active={activeTags === 'all'}
          onClick={() => {
            setTagsParam('all');
          }}
        >
          all
        </Tag>
        {tags &&
          tags.data.map(({attributes: {name}}: any) => (
            <Tag
              key={`t-${name}`}
              active={activeTags === name}
              onClick={() => {
                setTagsParam(name);
              }}
            >
              {name}
            </Tag>
          ))}
      </div>
    </div>
  );
};

export default ProblemFilterPanel;
