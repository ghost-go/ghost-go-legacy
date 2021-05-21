import Answer from "./Answer";
import { Segment } from "semantic-ui-react";

const AnswerSection = ({ answers }: { answers: any }) => (
  <div className="grid grid-cols-2 lg:grid-cols-2">
    {answers.map((a: any) => (
      <Answer data={a} />
    ))}
  </div>
);
export default AnswerSection;
