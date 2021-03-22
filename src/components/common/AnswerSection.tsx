import Answer from "./Answer";

const AnswerSection = ({ title, answers }: { title: string; answers: any }) => (
  <>
    <div className="text-lg text-gray-600 font-semibold mt-2">{title}</div>
    <div className="flex flex-wrap">
      {answers.map((a: any) => (
        <Answer answer={a} />
      ))}
    </div>
  </>
);
export default AnswerSection;
