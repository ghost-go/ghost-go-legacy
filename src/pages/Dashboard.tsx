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
  Divider,
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
      menuItem: { key: "statistics", content: "Statistics" },
      render: () => (
        <Tab.Pane>
          <Header as="h2">Total Problems Statistics</Header>
          <Divider />
          <Statistic.Group>
            <Statistic color="grey" size="large" horizontal>
              <Statistic.Value>22</Statistic.Value>
              <Statistic.Label>Tried</Statistic.Label>
            </Statistic>
            <Statistic color="green" size="large" horizontal>
              <Statistic.Value>31</Statistic.Value>
              <Statistic.Label>Rights</Statistic.Label>
            </Statistic>
            <Statistic color="red" size="large" horizontal>
              <Statistic.Value>22</Statistic.Value>
              <Statistic.Label>Wrongs</Statistic.Label>
            </Statistic>
          </Statistic.Group>
          <Divider />
          <Header as="h2">Last 7 days</Header>
          <Divider />
          <Statistic.Group>
            <Statistic color="grey" size="large" horizontal>
              <Statistic.Value>22</Statistic.Value>
              <Statistic.Label>Tried</Statistic.Label>
            </Statistic>
            <Statistic color="green" size="large" horizontal>
              <Statistic.Value>31</Statistic.Value>
              <Statistic.Label>Rights</Statistic.Label>
            </Statistic>
            <Statistic color="red" size="large" horizontal>
              <Statistic.Value>22</Statistic.Value>
              <Statistic.Label>Wrongs</Statistic.Label>
            </Statistic>
          </Statistic.Group>
          <Divider />
          <Header as="h2">Last 30 days</Header>
          <Divider />
          <Statistic.Group>
            <Statistic color="grey" size="large" horizontal>
              <Statistic.Value>22</Statistic.Value>
              <Statistic.Label>Tried</Statistic.Label>
            </Statistic>
            <Statistic color="green" size="large" horizontal>
              <Statistic.Value>31</Statistic.Value>
              <Statistic.Label>Rights</Statistic.Label>
            </Statistic>
            <Statistic color="red" size="large" horizontal>
              <Statistic.Value>22</Statistic.Value>
              <Statistic.Label>Wrongs</Statistic.Label>
            </Statistic>
          </Statistic.Group>
          <Divider />
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
