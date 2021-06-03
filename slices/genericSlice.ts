import {buildGenericBooleanSlice} from 'utils/reducers';

export const openSignInSlice = buildGenericBooleanSlice('openSignIn');
export const openSignUpSlice = buildGenericBooleanSlice('openSignUp');
export const openCommentsSlice = buildGenericBooleanSlice('openComments');
export const openUserMenuSlice = buildGenericBooleanSlice('openUserMenu');
export const openSettingMenuSlice = buildGenericBooleanSlice('openSettingMenu');
