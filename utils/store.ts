import reducer from 'slices';
import {configureStore} from '@reduxjs/toolkit';

export const store = configureStore({reducer});
