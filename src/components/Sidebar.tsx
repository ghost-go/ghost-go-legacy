import logo from "assets/images/logo.png";
import { SidebarItem } from "components/common";
import { useHistory } from "react-router-dom";
import { Dropdown, DropdownProps } from "semantic-ui-react";
import Navigation from "components/Navigation";
import { useTypedSelector } from "utils";

const Sidebar = () => {
  const { token, user } = useTypedSelector((i) => i.auth);
  const history = useHistory();
  const menuOptions = [
    {
      key: "problems",
      text: "Problems",
      value: "problems",
    },
    {
      key: "kifus",
      text: "Kifus",
      value: "kifus",
    },
  ];
  const handleItemChange = (
    e: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    history.push(`/${data.value}`);
  };

  return (
    <div className="flex flex-col w-full lg:w-64 text-gray-700 bg-white flex-shrink-0">
      <div className="flex-shrink-0 lg:px-5 flex flex-row items-center px-3 py-4 justify-between">
        <div className="flex flex-row items-center">
          <img className="w-8 h-8 lg:w-10 lg:h-10" src={logo} alt="logo" />
          <a
            href="/"
            className="ml-2 text-2xl font-semibold tracking-wider text-gray-900 rounded-sm focus:outline-none focus:shadow-outline">
            GhostGo
          </a>
          <div className="text-base mt-1 lg:hidden">
            <span className="mx-1">-</span>
            <Dropdown
              inline
              options={menuOptions}
              defaultValue={menuOptions[0].value}
              onChange={handleItemChange}
            />
          </div>
        </div>
        <div className={"lg:hidden"}>
          <Navigation />
        </div>
      </div>
      <nav className="flex-grow lg:block lg:px-4 lg:pb-0 lg:overflow-y-auto hidden">
        <div className="block px-1 py-1 mt-1 text-sm font-semibold text-gray-400">
          RESOURCES
        </div>
        <SidebarItem to="/problems">Problems</SidebarItem>
        <SidebarItem to="/kifus">Kifus</SidebarItem>
        {token && (
          <>
            <div className="block px-1 mt-8 text-sm font-semibold text-gray-400">
              OTHERS
            </div>
            <SidebarItem to="/dashboard">Dashboard</SidebarItem>
            <SidebarItem to="/viewed?type=problem">Viewed Problems</SidebarItem>
            <SidebarItem to="/viewed?type=kifu">Viewed Kifus</SidebarItem>
          </>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
