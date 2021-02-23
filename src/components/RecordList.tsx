import React from "react";
import Record from "./Record";
import { Col, Empty } from "antd";

const RecordList = (props: any) => {
  return (
    <React.Fragment>
      {props.recordList.length === 0 && <Empty />}
      {props.recordList.map((i: any) => (
        <Col xs={12} md={12} lg={8} xl={6}>
          <Record problem={i} showCreatedAt={props.showCreatedAt}></Record>
        </Col>
      ))}
    </React.Fragment>
  );
};

export default RecordList;
