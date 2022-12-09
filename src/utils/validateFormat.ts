import {
  incorrectEmailFormat,
  incorrectPassword,
  incorrectPasswordLength,
} from "@constants/sentences";
import { isEmailExp } from "@utils/regExp";

type ValidateFormatParams = {
  email: string;
  password: string;
  passwordCheck?: string | boolean;
};

export const validateFormat = ({ email, password, passwordCheck }: ValidateFormatParams) => {
  const result: { errorMessage: null | string; isCorrect: boolean } = {
    errorMessage: null,
    isCorrect: false,
  };
  const isEmailCorrectFormat = isEmailExp(email);
  const isPasswordCorrectFormat = password.length >= 8;
  const isSamePassword = !passwordCheck || password === passwordCheck;

  if (!isEmailCorrectFormat) {
    result.errorMessage = incorrectEmailFormat;
  } else if (!isPasswordCorrectFormat) {
    result.errorMessage = incorrectPasswordLength;
  } else if (!isSamePassword) {
    result.errorMessage = incorrectPassword;
  } else {
    result.isCorrect = true;
  }

  return result;
};
