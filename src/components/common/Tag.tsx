const Tag = ({
  children,
  onClick,
  ...props
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <span
    onClick={onClick}
    {...props}
    className="text-xs font-semibold inline-block py-1 px-2 rounded-sm text-gray-600 bg-gray-200 last:mr-0 mr-2 mb-2 cursor-pointer">
    {children}
  </span>
);

export default Tag;
