import React, { Fragment } from "react";

interface TagData {
  title: string;
  tags: Array<string>;
  active: string;
  callback: (tag: string) => void;
}

interface TagMenuProps {
  tagGroup: Array<TagData>;
}

const TagMenu = (props: TagMenuProps) => {
  return (
    <div className="tag-menu">
      {props.tagGroup.map((group) => {
        return (
          <Fragment>
            <div className="popover-title">{group.title}</div>
            <div className="popover-content">
              <ul className="tags">
                {group.tags.map((tag) => (
                  <li
                    key={tag}
                    onClick={group.callback.bind(null, tag)}
                    className={`tag ${group.active === tag ? "active" : ""}`}
                  >
                    <span>{tag}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
};

export default TagMenu;

// <Fragment>
//   <div className="popover-title">Players</div>
//   <div className="popover-content">
//     <ul className="tags">
//       {players.map((tag: string) => (
//         <li
//           key={tag}
//           className={`tag ${
//             settings.playerFilter === tag ? "active" : ""
//           }`}
//         >
//           <span
//             onClick={() => {
//               refetch({ players: tag });
//               updateSettings({
//                 playerFilter: tag,
//                 isFilterMenuOpen: false,
//               });
//             }}
//           >
//             {tag}
//           </span>
//         </li>
//       ))}
//     </ul>
//   </div>
// </Fragment>
