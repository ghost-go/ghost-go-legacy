import React, {ReactElement} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';

const SidebarItem = ({
  to,
  ...props
}: {
  to: string;
  children: React.ReactNode;
}): ReactElement => {
  const router = useRouter();
  let className =
    'transition block px-4 py-2 my-2 text-base font-semibold text-gray-900 rounded-sm hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline cursor-pointer';

  if (router.pathname.toUpperCase() === to.toUpperCase()) {
    className += ' bg-gray-200';
  }

  return (
    <Link {...props} href={to}>
      <div className={className}>{props.children}</div>
    </Link>
  );
};

export default SidebarItem;
