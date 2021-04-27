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
  Tab,
  Label,
} from "semantic-ui-react";
import { useDispatch, useTypedSelector, useOutsideClick } from "utils";

import logo from "assets/images/logo.png";
import { useHistory } from "react-router";

const Dashboard = () => {
  const { token, user } = useTypedSelector((i) => i.auth);
  const history = useHistory();
  if (!token) history.push("/");

  const panes = [
    {
      menuItem: { key: "dashboard", content: "Dashboard" },
      render: () => (
        <Tab.Pane>
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
            <Grid.Row columns={2} divided>
              <Grid.Column>
                <Header as="h2">This Week</Header>
                <Statistic.Group widths="3">
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
                </Statistic.Group>
              </Grid.Column>
              <Grid.Column>
                <Header as="h2">This Month</Header>
                <Statistic.Group widths="3">
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
                </Statistic.Group>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Tab.Pane>
      ),
    },
    {
      menuItem: { key: "tried", content: "Tried" },
      render: () => <Tab.Pane>Tried</Tab.Pane>,
    },
    {
      menuItem: { key: "most wrong", content: "Most Wrong" },
      render: () => (
        <Tab.Pane>
          <Card.Group itemsPerRow={4}>
            <Card>
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
            <Card size="small">
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
            <Card size="small">
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
          </Card.Group>
        </Tab.Pane>
      ),
    },
    {
      menuItem: { key: "Liked", content: "Liked" },
      render: () => <Tab.Pane>Liked</Tab.Pane>,
    },
  ];

  return <Tab panes={panes} />;
};

export default Dashboard;
