import {useState, useEffect, useRef} from 'react';
import {useSelector, TypedUseSelectorHook} from 'react-redux';
import {GenericState} from './reducers';
import {RootState} from 'slices';
import {useDispatch as useReactReduxDispatch} from 'react-redux';
import {store} from 'utils/store';

export const useGenericData = <T>(
  rawData: GenericState<T>,
  initialValue?: any
) => {
  const [data, setData] = useState(initialValue);

  useEffect(() => {
    if (rawData.status === 'succeeded') {
      if (rawData.payload) {
        setData(rawData.payload);
      }
    }
  }, [rawData]);

  return [data, setData];
};

export const useOutsideClick = (ref: any, callback: any) => {
  const handleClick = (e: any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
};

export type AppDispatch = typeof store.dispatch;
export const useDispatch = () => useReactReduxDispatch<AppDispatch>();

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAuth = () => {
  const auth = useTypedSelector(state => state.auth);
  const [token, setToken] = useState<string | null>();
  const [user, setUser] = useState<any>();

  useEffect(() => {
    const token = localStorage.getItem('token') ?? auth.token ?? null;
    const userStr = localStorage.getItem('user') ?? auth.user;

    setToken(token);
    if (userStr) {
      setUser(JSON.parse(userStr));
    } else {
      setUser(null);
    }
  }, [auth]);

  return {token, user};
};

/**
 * A custom useEffect hook that only triggers on updates, not on initial mount
 * @param {Function} effect
 * @param {Array<any>} dependencies
 */
export function useUpdateEffect(effect: any, dependencies: any[] = []) {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      effect();
    }
  }, dependencies);
}

export const useThrottleEffect = (effect: any, deps: any, delay: number) => {
  useEffect(() => {
    const handler = setTimeout(() => effect(), delay);
    return () => clearTimeout(handler);
  }, [...(deps || []), delay]);
};
