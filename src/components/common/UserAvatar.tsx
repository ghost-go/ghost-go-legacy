import Avatar from "react-avatar";
import { Image } from "semantic-ui-react";

const UserAvatar = ({ user, size = "40px" }: any) => {
  let res = <Avatar />;
  if (user && user.data.attributes.avatar_url) {
    res = (
      <Image
        style={{ width: size, height: size }}
        src={user.data.attributes.avatar_url}
        avatar
      />
    );
  }
  if (user && !user.data.attributes.avatar_url) {
    res = <Avatar round size={size} name={user.data.attributes.display_name} />;
  }
  return res;
};

export default UserAvatar;
