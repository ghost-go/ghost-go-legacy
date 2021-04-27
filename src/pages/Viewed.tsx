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
      menuItem: {
        key: "dashboard",
        icon: "dashboard",
        content: "Viewed Problems",
      },
      render: () => <Tab.Pane></Tab.Pane>,
    },
    {
      menuItem: { key: "tried", content: "Viewed Kifus" },
      render: () => <Tab.Pane>Tried</Tab.Pane>,
    },
  ];

  return <Tab panes={panes} />;
};

export default Dashboard;
