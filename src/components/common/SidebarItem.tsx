import React, { ReactElement } from "react";
import { Link, useLocation } from "react-router-dom";

const SidebarItem = ({
  to,
  ...props
}: {
  to: string;
  children: React.ReactNode;
}): ReactElement => {
  const location = useLocation();
  let className =
    "transition block px-4 py-2 mt-3 text-base font-semibold text-gray-900 rounded-sm hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline";
  if (location.pathname.toUpperCase() === to.toUpperCase()) {
    className += " bg-gray-200";
  }

  return (
    <Link {...props} className={className} to={to}>
      {props.children}
    </Link>
  );
};

export default SidebarItem;
