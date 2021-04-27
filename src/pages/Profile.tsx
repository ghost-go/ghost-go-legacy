import {
  Container,
  Image,
  Segment,
  Reveal,
  Header,
  Tab,
  Menu,
  Label,
} from "semantic-ui-react";
import { useDispatch, useTypedSelector } from "utils";
import { UserAvatar } from "components/common";

const Profile = () => {
  const { token, user } = useTypedSelector((i) => i.auth);

  const panes = [
    {
      menuItem: { key: "users", icon: "users", content: "Profile" },
      render: () => (
        <Tab.Pane>
          <UserAvatar size="100px" user={user} />
          <div className="ml-5">
            <Header>{user.data.attributes.display_name}</Header>
            <div>
              Name: @{user.data.attributes.name || user.data.attributes.id}
            </div>
            <div>Bio: @{}</div>
          </div>
          <div></div>
        </Tab.Pane>
      ),
    },
    {
      menuItem: { key: "comments", icon: "comment", content: "Comments" },
      render: () => <Tab.Pane>Comments</Tab.Pane>,
    },
    {
      menuItem: (
        <Menu.Item key="messages">
          Messages<Label>15</Label>
        </Menu.Item>
      ),
      render: () => <Tab.Pane>Tab 2 Content</Tab.Pane>,
    },
  ];

  return (
    <Container>
      <Tab panes={panes} />
    </Container>
  );
};

export default Profile;
