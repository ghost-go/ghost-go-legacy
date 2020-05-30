import React from "react";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";

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

const Record = (props: any) => {
  const i = props.problem;
  return (
    <Link key={`${i.id}`} to={`/problems/${i.id}`}>
      <ListBox>
        <Row>
          <Col span={10}>
            <Image src={i.previewImgR1.x300} alt="" />
          </Col>
          <Col span={14} style={{ textAlign: "right" }}>
            <ProblemTitle>{`P-${i.id}(${i.rank})`}</ProblemTitle>
            <div>{i.whofirst}</div>
            {/* TODO: implement record date */}
            <div>{moment(i.createdAt).format("YYYY-MM-DD")}</div>
          </Col>
        </Row>
      </ListBox>
    </Link>
  );
};

export default Record;
