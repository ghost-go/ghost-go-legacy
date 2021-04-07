import Answer from "./Answer";

const AnswerSection = ({
  title,
  answers,
  move,
  setMove,
}: {
  title: string;
  answers: any;
  move: number;
  setMove: (move: number) => void;
}) => (
  <>
    <div className="text-lg text-gray-600 font-semibold mt-4">{title}</div>
    {/* <div className="flex flex-wrap"> */}
    <div className="grid grid-cols-2 lg:grid-cols-2">
      {answers.map((a: any) => (
        <Answer data={a} />
      ))}
    </div>
  </>
);
export default AnswerSection;
