import React from "react";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";

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

const ListBox = styled.div`
  display: "flex";
  width: "300px";
  height: "120px";
  float: "left";
`;

const Image = styled.img`
  width: 100%;
`;

const ProblemTitle = styled.div`
  padding: 10px 0;
  font-size: 20px;
`;

const RecordList = (props: any) => {
  return (
    <div>
      {props.recordList.map((i: any) => (
        <Link key={`${i.identifier}`} to={`/problems/${i.identifier}`}>
          <ListBox>
            <Row>
              <Col span={10}>
                <Image src={i.previewImgR1.x300} alt="" />
              </Col>
              <Col span={14} style={{ textAlign: "right" }}>
                <ProblemTitle>{`P-${i.identifier}(${i.rank})`}</ProblemTitle>
                <div>{i.whofirst}</div>
                <div>{moment(i.updated_at).format("YYYY-MM-DD")}</div>
              </Col>
            </Row>
          </ListBox>
        </Link>
      ))}
    </div>
  );
};

export default RecordList;
