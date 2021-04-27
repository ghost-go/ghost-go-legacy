import {
  Container,
  Statistic,
  Header,
  Grid,
  Card,
  Image,
  Icon,
  Menu,
  Segment,
} from "semantic-ui-react";
import { useDispatch, useTypedSelector, useOutsideClick } from "utils";

import logo from "assets/images/logo.png";
import { useHistory } from "react-router";

const Dashboard = () => {
  const { token, user } = useTypedSelector((i) => i.auth);
  const history = useHistory();
  if (!token) history.push("/");

  return (
    <Grid container stackable divided="vertically">
      <Grid.Row columns={2} divided>
        <Grid.Column>
          <Header as="h2">Problems</Header>
          <Statistic.Group widths="4">
            <Statistic color="grey">
              <Statistic.Value>22</Statistic.Value>
              <Statistic.Label>Tried</Statistic.Label>
            </Statistic>
            <Statistic color="green">
              <Statistic.Value>31</Statistic.Value>
              <Statistic.Label>Rights</Statistic.Label>
            </Statistic>
            <Statistic color="orange">
              <Statistic.Value>22</Statistic.Value>
              <Statistic.Label>Wrongs</Statistic.Label>
            </Statistic>
            <Statistic color="red">
              <Statistic.Value>22</Statistic.Value>
              <Statistic.Label>Liked</Statistic.Label>
            </Statistic>
          </Statistic.Group>
        </Grid.Column>
        <Grid.Column>
          <Header as="h2">Kifus</Header>
          <Statistic.Group widths="2">
            <Statistic color="grey">
              <Statistic.Value>22</Statistic.Value>
              <Statistic.Label>Viewed</Statistic.Label>
            </Statistic>
            <Statistic color="red">
              <Statistic.Value>30</Statistic.Value>
              <Statistic.Label>Liked</Statistic.Label>
            </Statistic>
          </Statistic.Group>
        </Grid.Column>
      </Grid.Row>

      {/* <Menu pointing secondary>
          <Menu.Item name="home" active={false} onClick={() => {}} />
          <Menu.Item name="messages" active={false} onClick={() => {}} />
          <Menu.Item name="friends" active={false} onClick={() => {}} />
        </Menu> */}

      <Grid.Row divided columns={3}>
        <Grid.Column>
          <Header as="a">The Most Wrong Problems</Header>
          <div className="my-2">
            <Card fluid>
              <Card.Content>
                <Image
                  floated="right"
                  size="tiny"
                  src={logo}
                  spaced={false}
                  style={{ marginBottom: 0, marginLeft: 0 }}
                />
                <Card.Header>P-10000</Card.Header>
                <Card.Meta>
                  <span>Level: 4K</span>
                </Card.Meta>
                <Card.Meta>
                  <span>Black to move</span>
                </Card.Meta>
                <Card.Meta>
                  <span>Right rate: 21.3%</span>
                </Card.Meta>
              </Card.Content>
              <Card.Content extra>
                {/* <Icon name="" /> */}
                Your wrong count: 10
              </Card.Content>
            </Card>
          </div>
          <div className="my-2">
            <Card size="small" fluid>
              <Card.Content>
                <Image floated="right" size="tiny" src={logo} />
                <Card.Header>P-10000</Card.Header>
                <Card.Meta>
                  <span>Level: 4K</span>
                </Card.Meta>
                <Card.Meta>
                  <span>Black to move</span>
                </Card.Meta>
                <Card.Meta>
                  <span>Right rate: 21.3%</span>
                </Card.Meta>
              </Card.Content>
              <Card.Content extra>
                {/* <Icon name="" /> */}
                Your wrong count: 10
              </Card.Content>
            </Card>
          </div>
          <div className="my-2">
            <Card size="small" fluid>
              <Card.Content>
                <Image floated="right" size="tiny" src={logo} />
                <Card.Header>P-10000</Card.Header>
                <Card.Meta>
                  <span>Level: 4K</span>
                </Card.Meta>
                <Card.Meta>
                  <span>Black to move</span>
                </Card.Meta>
                <Card.Meta>
                  <span>Right rate: 21.3%</span>
                </Card.Meta>
              </Card.Content>
              <Card.Content extra>
                {/* <Icon name="" /> */}
                Your wrong count: 10
              </Card.Content>
            </Card>
          </div>
        </Grid.Column>
        <Grid.Column>
          <Header as="a">Viewed Problems</Header>
          {/* <Image src="/images/wireframe/paragraph.png" /> */}
        </Grid.Column>
        <Grid.Column>
          <Header as="a">Viewed Kifus</Header>
          {/* <Image src="/images/wireframe/paragraph.png" /> */}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Dashboard;
