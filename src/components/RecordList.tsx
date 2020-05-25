import React from "react";

import Record from "./Record";

const RecordList = (props: any) => {
  return (
    <div>
      {props.recordList.length === 0 && <div>No data</div>}
      {props.recordList.map((i: any) => (
        <Record problem={i}></Record>
      ))}
    </div>
  );
};

export default RecordList;
