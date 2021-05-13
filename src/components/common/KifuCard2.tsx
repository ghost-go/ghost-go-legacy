import { Card, Image } from "semantic-ui-react";
import moment from "moment";

const KifuCard2 = ({
  kifu,
  extra,
  onClick,
}: {
  kifu: any;
  extra: string;
  onClick: any;
}) => {
  const {
    image_url,
    b_name_en,
    w_name_en,
    date,
    result,
    b_rank,
    w_rank,
  } = kifu.attributes;
  return (
    <Card onClick={onClick}>
      <Card.Content>
        <Image
          floated="right"
          width="45%"
          src={image_url}
          spaced={false}
          style={{ marginBottom: 0, marginLeft: 0 }}
        />
        <Card.Header className="pt-2">{`${b_name_en}(${b_rank})`}</Card.Header>
        <Card.Header className="pt-2">{`${w_name_en}(${w_rank})`}</Card.Header>
        <Card.Meta>
          <span>{`Result: ${result}`}</span>
        </Card.Meta>
        <Card.Meta>
          <span>{moment(date).locale("en").format("YYYY-MM-DD")}</span>
        </Card.Meta>
      </Card.Content>
      {extra && <Card.Content extra>{extra}</Card.Content>}
    </Card>
  );
};

export default KifuCard2;
