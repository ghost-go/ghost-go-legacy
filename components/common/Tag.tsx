const Tag = ({
  active,
  children,
  onClick,
  ...props
}: {
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <span
    onClick={onClick}
    {...props}
    className={`text-xs font-semibold inline-block py-1 px-2 rounded-sm last:mr-0 mr-2 mb-2 cursor-pointer hover:bg-black hover:text-white ${
      active ? 'bg-black text-white' : 'text-gray-600 bg-gray-200'
    }`}
  >
    {children}
  </span>
);

export default Tag;
