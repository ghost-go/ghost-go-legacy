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
    <div className="text-lg text-gray-600 font-semibold mt-2">{title}</div>
    <div className="flex flex-wrap">
      {answers.map((a: any) => (
        <Answer data={a} move={move} setMove={setMove} />
      ))}
    </div>
  </>
);
export default AnswerSection;
