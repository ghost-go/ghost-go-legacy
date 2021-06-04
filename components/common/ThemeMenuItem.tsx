import {Theme} from 'gboard/GBan';
import {setTheme, selectUI} from 'slices';
import {useDispatch, useTypedSelector} from 'utils';

const ThemeMenuItem = ({text, theme}: {text: string; theme: Theme}) => {
  const dispatch = useDispatch();
  const {theme: currentTheme} = useTypedSelector(state => selectUI(state));

  const handleThemeChange = (theme: Theme) => {
    dispatch(setTheme(theme));
  };

  return (
    <span
      onClick={() => {
        handleThemeChange(theme);
      }}
      className={`block px-4 py-1 m-1 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-90 cursor-pointer ${
        currentTheme === theme && 'bg-gray-100 text-gray-900'
      }`}
    >
      {text}
    </span>
  );
};

export default ThemeMenuItem;
