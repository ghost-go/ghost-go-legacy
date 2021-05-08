import { useEffect } from "react";
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
import {
  useDispatch,
  useTypedSelector,
  useOutsideClick,
  useGenericData,
} from "utils";

import logo from "assets/images/logo.png";
import { useHistory } from "react-router";
import { fetchViewedProblems, fetchViewedKifus } from "slices";

const Dashboard = () => {
  const { token, user } = useTypedSelector((i) => i.auth);
  const history = useHistory();
  const dispatch = useDispatch();

  const [viewedProblems] = useGenericData(
    useTypedSelector((i) => i.viewedProblems)
  );
  const [viewedKifus] = useGenericData(useTypedSelector((i) => i.viewedKifus));

  if (!token) history.push("/");

  const panes = [
    {
      menuItem: {
        key: "dashboard",
        icon: "dashboard",
        content: "Viewed Problems",
      },
      render: () => (
        <Tab.Pane>
          {viewedProblems &&
            viewedProblems.map((p: any) => {
              return <div>{p.id}</div>;
            })}
        </Tab.Pane>
      ),
    },
    {
      menuItem: { key: "tried", content: "Viewed Kifus" },
      render: () => <Tab.Pane>Tried</Tab.Pane>,
    },
  ];

  useEffect(() => {
    dispatch(fetchViewedProblems({ token }));
    dispatch(fetchViewedKifus({ token }));
  }, [dispatch, token]);

  return <Tab panes={panes} />;
};

export default Dashboard;
