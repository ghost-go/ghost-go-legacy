import { Toast } from "utils/index";

export const handleError = (error: any) => {
  // console.log(error);
  Toast.error(error.message);
};
