import Link from 'next/link';
import {Button, Popup, Menu, MenuItemProps} from 'semantic-ui-react';

import {ReactSVG} from 'react-svg';
import settings from 'public/images/settings.svg';

import {
  setCoordinates,
  selectUI,
  openSignInSlice,
  openUserMenuSlice,
  authSlice,
} from 'slices';
import {useDispatch, useTypedSelector, useAuth} from 'utils';
import {Theme} from 'gboard/GBan';
import {Switch, ThemeMenuItem, UserAvatar} from 'components/common';

const Navigation = () => {
  const dispatch = useDispatch();
  const {token, user} = useAuth();
  const {coordinates} = useTypedSelector(state => selectUI(state));
  const openUserMenu = useTypedSelector(state => state.openUserMenu);

  const handleItemClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    {name}: MenuItemProps
  ) => {
    switch (name) {
      case 'signout':
        dispatch(authSlice.actions.signOut());
        break;
      default:
    }
    dispatch(openUserMenuSlice.actions.makeFalse());
  };

  return (
    <div className="flex flex-row justify-between">
      <div></div>
      <div className="flex flex-row items-center">
        <div className="relative">
          <Popup
            on="click"
            pinned
            position="bottom right"
            trigger={
              <div className="cursor-pointer mr-4">
                <ReactSVG className="w-7 h-7" src={settings} />
              </div>
            }
          >
            <div>
              <div className="p-1 font-semibold">Theme:</div>
              <div className="grid grid-cols-2" role="none">
                <ThemeMenuItem text="Black&White" theme={Theme.BlackAndWhite} />
                <ThemeMenuItem text="Flat" theme={Theme.Flat} />
                <ThemeMenuItem text="Subdued" theme={Theme.Subdued} />
                <ThemeMenuItem text="ShellStone" theme={Theme.ShellStone} />
                <ThemeMenuItem
                  text="SlateAndShell"
                  theme={Theme.SlateAndShell}
                />
                <ThemeMenuItem text="Walnut" theme={Theme.Walnut} />
                <ThemeMenuItem
                  text="Photorealistic"
                  theme={Theme.Photorealistic}
                />
              </div>
              <Switch
                label="Show Coordinates: "
                onClick={() => {
                  dispatch(setCoordinates(!coordinates));
                }}
                checked={coordinates}
              />
            </div>
          </Popup>
        </div>
        {token && user ? (
          <Popup
            on="click"
            open={openUserMenu}
            pinned
            onOpen={() => {
              dispatch(openUserMenuSlice.actions.makeTrue());
            }}
            onClose={() => {
              // setTimeout here is make sure to call the item click event.
              setTimeout(() => {
                dispatch(openUserMenuSlice.actions.makeFalse());
              }, 0);
            }}
            position="bottom right"
            style={{padding: 0}}
            trigger={
              <div className="cursor-pointer">
                <UserAvatar user={user} />
              </div>
            }
          >
            <Menu vertical>
              <Menu.Item>
                Signed In as <b>{`${user.data.attributes.display_name}`}</b>
                <Menu.Menu>
                  <Link href="/statistics">
                    <Menu.Item>Statistic</Menu.Item>
                  </Link>
                  <Link href="/profile">
                    <Menu.Item>My Profile</Menu.Item>
                  </Link>
                  <Link href="/viewed?active=0">
                    <Menu.Item>Viewed Problems</Menu.Item>
                  </Link>
                  <Link href={'/viewed?active=1'}>
                    <Menu.Item>Viewed Kifus</Menu.Item>
                  </Link>
                </Menu.Menu>
              </Menu.Item>
              <Menu.Item>
                Page
                <Menu.Menu>
                  <Link href={'/problems'}>
                    <Menu.Item>Problems</Menu.Item>
                  </Link>
                  <Link href={'/kifus'}>
                    <Menu.Item>Kifus</Menu.Item>
                  </Link>
                </Menu.Menu>
              </Menu.Item>
              {/* <Link href={'/messages'}>
                <Menu.Item>Messages</Menu.Item>
              </Link> */}
              <Menu.Item name="signout" onClick={handleItemClick}>
                Sign out
              </Menu.Item>
            </Menu>
          </Popup>
        ) : (
          <Button
            color="black"
            onClick={() => {
              dispatch(openSignInSlice.actions.toggle());
            }}
          >
            Sign In
          </Button>
        )}
      </div>
    </div>
  );
};
export default Navigation;
