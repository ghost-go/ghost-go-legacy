import React, { useState, useEffect } from "react";

import IconButton from "material-ui/IconButton";
import Paper from "material-ui/Paper";
import { clearMoves, addMoves, updateSettings } from "../common/utils";
import { useQuery } from "@apollo/client";
import { GET_SETTINGS } from "../common/graphql";

const styles = {
  answerContainer: {
    display: "flex",
    flex: "1 1 auto",
  },

  noInfo: {
    display: "flex",
    justifyContent: "middle",
    width: "70px",
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
};

const AnswerBar = (props) => {
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

  return (
    <Paper style={styles.answerContainer} zDepth={0}>
      <div style={styles.noInfo}>{`No.${props.id}`}</div>
      <div style={styles.stepInfo}>{`${current}/${
        props.answer.split(";").length
      }`}</div>
      <IconButton
        onClick={() => {
          updateSettings({ currentAnswerId: props.id });
          clearMoves();
          setCurrent(1);
          addMoves(moves[0]);
        }}
        iconStyle={styles.smallIcon}
        style={styles.small}
        iconClassName="fa fa-backward"
      />
      <IconButton
        onClick={() => {
          updateSettings({ currentAnswerId: props.id });
          if (current > 1) {
            clearMoves();
            setCurrent(current - 1);
            addMoves(moves.slice(0, current - 1));
          }
        }}
        iconStyle={styles.smallIcon}
        style={styles.small}
        iconClassName="fa fa-step-backward"
      />
      <IconButton
        onClick={() => {
          updateSettings({ currentAnswerId: props.id });
          if (current < moves.length) {
            clearMoves();
            setCurrent(current + 1);
            addMoves(moves.slice(0, current + 1));
          }
        }}
        iconStyle={styles.smallIcon}
        style={styles.small}
        iconClassName="fa fa-play"
      />
      <IconButton
        onClick={() => {
          updateSettings({ currentAnswerId: props.id });
          clearMoves();
          addMoves(moves);
        }}
        iconStyle={styles.smallIcon}
        style={styles.small}
        iconClassName="fa fa-step-forward"
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
    </Paper>
  );
};
export default AnswerBar;

//   firstStep() {
//     const steps = this.props.answer.split(";");
//     this.props.setCurrentMode("research");
//     this.props.setCurrentAnswerId(this.props.id);
//     this.props.resetSteps();
//     this.props.addSteps(steps[0]);
//   }

//   prevStep() {
//     const steps = this.props.answer.split(";");
//     this.props.setCurrentMode("research");
//     this.props.resetSteps();
//     this.props.addSteps(steps.slice(0, this.props.steps.length - 1));
//   }

//   nextStep() {
//     const steps = this.props.answer.split(";");
//     this.props.setCurrentMode("research");
//     if (this.props.currentAnswerId !== this.props.id) {
//       this.firstStep();
//     } else {
//       this.props.resetSteps();
//       this.props.addSteps(steps.slice(0, this.props.steps.length + 1));
//     }
//   }

//   lastStep() {
//     const steps = this.props.answer.split(";");
//     this.props.setCurrentMode("research");
//     this.props.resetSteps();
//     this.props.addSteps(steps);
//   }

//   render() {
//     const current =
//       this.props.currentAnswerId === this.props.id
//         ? this.props.steps.length
//         : 0;
//     return (
//     );
//   }
// }
