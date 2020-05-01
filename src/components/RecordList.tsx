// import React from "react";
// import PropTypes from "prop-types";
// import { List } from "material-ui/List";
// import { Link } from "react-router-dom";
// import moment from "moment";

// import { StyleSheet, css } from "aphrodite";

const RecordList = () => {
  return null;
};

export default RecordList;

// const style = StyleSheet.create({
//   listBox: {
//     display: "flex",
//     width: "300px",
//     height: "120px",
//     float: "left",
//   },

//   previewImg: {
//     width: "100px",
//   },

//   title: {
//     fontSize: "20px",
//   },

//   listRight: {
//     display: "flex",
//     flexDirection: "column",
//     padding: "8px",
//   },

//   date: {
//     marginTop: "auto",
//     marginBottom: "20px",
//   },
// });

// const RecordList = (props) => {
//   return (
//     <List>
//       {props.recordList.map((i) => (
//         <Link
//           key={`${props.type}_${i.identifier}`}
//           to={`/problems/${i.identifier}`}
//         >
//           <div className={css(style.listBox)}>
//             <div className="list-preview-img">
//               <img
//                 className={css(style.previewImg)}
//                 src={i.previewImgR1.x300}
//                 alt=""
//               />
//             </div>
//             <div className={css(style.listRight)}>
//               <span
//                 className={css(style.title)}
//               >{`P-${i.identifier}(${i.rank})`}</span>
//               <span>{i.whofirst}</span>
//               <span className={css(style.date)}>
//                 {moment(i.updated_at).format("YYYY-MM-DD")}
//               </span>
//             </div>
//           </div>
//         </Link>
//       ))}
//     </List>
//   );
// };
// RecordList.propTypes = {
//   type: PropTypes.string.isRequired,
//   recordList: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       preview_img_r1: PropTypes.shape({
//         x200: PropTypes.shape({
//           url: PropTypes.string.isRequired,
//         }),
//       }).isRequired,
//       rank: PropTypes.string.isRequired,
//       whofirst: PropTypes.string.isRequired,
//       updated_at: PropTypes.string.isRequired,
//     })
//   ).isRequired,
// };

// export default RecordList;
