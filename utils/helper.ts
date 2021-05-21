import jwtDecode, { JwtPayload } from "jwt-decode";

export const checkTokenIsValid = async (token?: string) => {
  if (token) {
    const decoded = jwtDecode<JwtPayload>(token);
    const exp = decoded.exp;
    if (exp && Date.now() >= Number(exp) * 1000) {
      return false;
    }
    return true;
  } else {
    return false;
  }
};
