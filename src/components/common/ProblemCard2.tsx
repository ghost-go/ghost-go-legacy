import { Card, Image } from "semantic-ui-react";

const ProblemCard2 = ({ problem, extra }: { problem: any; extra: string }) => {
  const {
    image_url,
    rights_count,
    tried_count,
    whofirst,
    rank,
  } = problem.attributes;
  const rightRate =
    tried_count > 0 ? `${(rights_count / tried_count).toFixed(2)}%` : "No Data";
  return (
    <Card>
      <Card.Content>
        <Image
          floated="right"
          width="45%"
          src={image_url}
          spaced={false}
          style={{ marginBottom: 0, marginLeft: 0 }}
        />
        <Card.Header className="pt-2">P-{problem.id}</Card.Header>
        <Card.Meta>
          <span>{`Level: ${rank}`}</span>
        </Card.Meta>
        <Card.Meta>
          <span>{`${whofirst}`}</span>
        </Card.Meta>
        <Card.Meta>
          <span>{`Right rate: ${rightRate}`}</span>
        </Card.Meta>
      </Card.Content>
      {extra && <Card.Content extra>{extra}</Card.Content>}
    </Card>
  );
};

export default ProblemCard2;
