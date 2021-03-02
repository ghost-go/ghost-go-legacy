import React, { ReactElement } from "react";

const SidebarItem = ({
  to,
  active = false,
  ...props
}: {
  to: string;
  active?: boolean;
  children: React.ReactNode;
}): ReactElement => {
  let className =
    "transition block px-4 py-2 mt-3 text-base font-semibold text-gray-900 rounded-sm hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline";
  if (active) {
    className += " bg-gray-200";
  }

  return (
    <a {...props} className={className} href={to}>
      {props.children}
    </a>
  );
};

export default SidebarItem;
