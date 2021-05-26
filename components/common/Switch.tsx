const Switch = ({
  label,
  onClick,
  checked,
  labelClassName = 'p-1 font-semibold my-2 ',
}: {
  label: string;
  onClick: () => void;
  checked: boolean;
  labelClassName?: string;
}) => (
  <div className="flex items-center" onClick={onClick}>
    <label className={`${labelClassName}`}>{label}</label>
    <div className="relative inline-block w-10 mx-4 align-middle select-none transition duration-200 ease-in">
      <input
        type="checkbox"
        name="toggle"
        className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none outline-none cursor-pointer"
        onChange={() => {}}
        checked={checked}
      />
      <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
    </div>
  </div>
);
export default Switch;
