import {useRef, useState} from 'react';

import Link from 'next/link';
import {Button, Popup, Menu, MenuItemProps} from 'semantic-ui-react';

import {ReactSVG} from 'react-svg';
import settings from 'public/images/settings.svg';

import {
  setTheme,
  setCoordinates,
  selectUI,
  openSignInSlice,
  openUserMenuSlice,
  authSlice,
} from 'slices';
import {useDispatch, useTypedSelector, useOutsideClick, useAuth} from 'utils';
import {Theme} from 'gboard/GBan';
import {Switch, UserAvatar} from 'components/common';

const Navigation = () => {
  const dispatch = useDispatch();
  const [settingVisible, setSettingVisible] = useState(false);
  const {token, user} = useAuth();
  const {theme, coordinates} = useTypedSelector(state => selectUI(state));
  const openUserMenu = useTypedSelector(state => state.openUserMenu);
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => {
    if (settingVisible) {
      setSettingVisible(false);
    }
  });

  const handleThemeChange = (theme: Theme) => {
    dispatch(setTheme(theme));
  };

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
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div className="flex flex-row items-center">
        <div className="relative">
          <div
            className={`transition absolute cursor-pointer p-4
            bg-white z-50 top-6 right-8 shadow-lg rounded-sm w-36 text-base
            ${settingVisible ? 'flex' : 'opacity-0 pointer-events-none'}
          `}
          >
            <div
              ref={ref}
              className="origin-top-right absolute right-0 p-2 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <div className="p-1 font-semibold">Theme:</div>
              <div className="grid grid-cols-2" role="none">
                <span
                  onClick={() => {
                    handleThemeChange(Theme.BlackAndWhite);
                  }}
                  className={`menu-item-theme ${
                    theme === Theme.BlackAndWhite && 'active'
                  }`}
                  role="menuitem"
                >
                  Black&White
                </span>
                <span
                  onClick={() => {
                    handleThemeChange(Theme.Flat);
                  }}
                  className={`menu-item-theme ${
                    theme === Theme.Flat && 'active'
                  }`}
                  role="menuitem"
                >
                  Flat
                </span>
                <span
                  onClick={() => {
                    handleThemeChange(Theme.Subdued);
                  }}
                  className={`menu-item-theme ${
                    theme === Theme.Subdued && 'active'
                  }
                `}
                  role="menuitem"
                >
                  Subdued
                </span>
                <span
                  onClick={() => {
                    handleThemeChange(Theme.ShellStone);
                  }}
                  className={`menu-item-theme ${
                    theme === Theme.ShellStone && 'active'
                  }`}
                  role="menuitem"
                >
                  Shell
                </span>
                <span
                  onClick={() => {
                    handleThemeChange(Theme.SlateAndShell);
                  }}
                  className={`menu-item-theme ${
                    theme === Theme.SlateAndShell && 'active'
                  }`}
                  role="menuitem"
                >
                  SlateAndShell
                </span>
                <span
                  onClick={() => {
                    handleThemeChange(Theme.Walnut);
                  }}
                  className={`menu-item-theme ${
                    theme === Theme.Walnut && 'active'
                  }`}
                  role="menuitem"
                >
                  Walnut
                </span>
                <span
                  onClick={() => {
                    handleThemeChange(Theme.Photorealistic);
                  }}
                  className={`menu-item-theme ${
                    theme === Theme.Photorealistic && 'active'
                  }`}
                  role="menuitem"
                >
                  Photorealistic
                </span>
              </div>
              <Switch
                label="Show Coordinates: "
                onClick={() => {
                  dispatch(setCoordinates(!coordinates));
                }}
                checked={coordinates}
              />
            </div>
          </div>
          <div
            onClick={() => {
              setSettingVisible(!settingVisible);
            }}
          >
            <ReactSVG className="w-7 h-7 mr-4 cursor-pointer" src={settings} />
          </div>
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
