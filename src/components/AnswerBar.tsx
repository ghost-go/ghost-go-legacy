import React, { useState, useEffect } from "react";

import { clearMoves, addMoves, updateSettings } from "../common/utils";
import { useQuery } from "@apollo/client";
import { GET_SETTINGS } from "../common/graphql";
import {
  StepBackwardOutlined,
  StepForwardOutlined,
  CaretLeftOutlined,
  CaretRightOutlined,
} from "@ant-design/icons";

const styles = {
  answerContainer: {
    display: "flex",
    flex: "1 1 auto",
  },

  noInfo: {
    display: "flex",
    justifyContent: "middle",
    marginLeft: "15px",
    fontSize: "16px",
    lineHeight: "32px",
  },

  stepInfo: {
    width: "40px",
    marginLeft: "10px",
    fontSize: "16px",
    lineHeight: "32px",
  },

  voteInfo: {
    marginLeft: "20px",
    marginRight: "5px",
    fontSize: "16px",
  },

  vote: {
    width: 28,
    height: 28,
    padding: 0,
  },

  smallIcon: {
    fontSize: "16px",
  },

  small: {
    width: 32,
    height: 32,
    padding: 5,
  },

  reverse: {
    transform: "scale(-1, 1)",
  },
};

const AnswerBar = (props: any) => {
  const [current, setCurrent] = useState(0);
  const { data } = useQuery(GET_SETTINGS);
  const { settings } = data;
  const { answer } = props;
  const moves = answer.split(";");
  useEffect(() => {
    if (settings.currentAnswerId !== props.id) {
      setCurrent(0);
    }
  }, [settings.currentAnswerId, props.id]);

  const handleAnswerMoves = (current: number, newMoves: Array<string>) => {
    updateSettings({ currentAnswerId: props.id, currentMode: "research" });
    if (current >= 0 && current <= moves.length) {
      clearMoves();
      setCurrent(current);
      addMoves(newMoves);
    }
  };

  const iconStyle = {
    fontSize: 24,
    padding: "5px",
  };

  return (
    <div style={styles.answerContainer}>
      <div style={styles.noInfo}>{`No.${props.id}`}</div>
      <div style={styles.stepInfo}>{`${current}/${
        props.answer.split(";").length
      }`}</div>
      <StepBackwardOutlined
        style={iconStyle}
        onClick={handleAnswerMoves.bind(null, 1, moves[0])}
      />
      <CaretLeftOutlined
        style={iconStyle}
        onClick={handleAnswerMoves.bind(
          null,
          current - 1,
          moves.slice(0, current - 1)
        )}
      />
      <CaretRightOutlined
        style={iconStyle}
        onClick={handleAnswerMoves.bind(
          null,
          current + 1,
          moves.slice(0, current + 1)
        )}
      />
      <StepForwardOutlined
        style={iconStyle}
        onClick={handleAnswerMoves.bind(null, moves.length, moves)}
      />
      {
        // <div style={styles.voteInfo}>Vote</div>
        // <IconButton
        // iconStyle={styles.smallIcon} style={styles.vote} iconClassName="fa fa-thumbs-o-up" />
        // <span>{this.props.up}</span>
        // <IconButton
        // iconStyle={styles.smallIcon} style={styles.vote} iconClassName="fa fa-thumbs-o-down" />
        // <span>{this.props.down}</span>
      }
    </div>
  );
};
export default AnswerBar;
