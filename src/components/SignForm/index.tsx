import { FormEvent, MouseEvent, useCallback, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { SignOptionType, sign } from "@api/auth";
import Button from "@components/Button";
import useErrorMessage from "@components/ErroMessage";
import * as S from "@components/SignForm/SignForm.style";
import {
  failToLogin,
  failToSignUp,
  incorrectEmailFormat,
  incorrectPassword,
  incorrectPasswordLength,
  successToSignUp,
} from "@constants/sentences";
import { CANCEL, EMAIL, PASSWORD, PASSWORDCHECK, SIGNIN, SIGNUP } from "@constants/words";
import { useDebounce } from "@hooks/useDebounce";
import useInput from "@hooks/useInput";
import { pathName } from "@router";
import { isEmailExp } from "@utils/regExp";

type SignFormPropsType = {
  signOption: SignOptionType;
  changeSignOption: () => void;
  receivedMessage?: string;
};

type OptionalTextsType = {
  [P in SignOptionType]: {
    title: string;
    submitButtonText: string;
    optionButtonText: string;
  };
};

const optionalTexts: OptionalTextsType = {
  signin: { title: "SIGN IN HERE", submitButtonText: SIGNIN, optionButtonText: SIGNUP },
  signup: {
    title: "SIGN UP FOR THIS SITE",
    submitButtonText: SIGNUP,
    optionButtonText: CANCEL,
  },
};

const SignForm = ({ signOption, changeSignOption, receivedMessage }: SignFormPropsType) => {
  const { inputValue: email, setInputValue: setEmail, onChange: onChangeEmail } = useInput("");
  const {
    inputValue: password,
    setInputValue: setPassword,
    onChange: onChangePassword,
  } = useInput("");
  const {
    inputValue: passwordCheck,
    setInputValue: setPasswordCheck,
    onChange: onChangePasswordCheck,
  } = useInput("");
  const [isSubmitPossible, setIsSubmitPossible] = useState(false);
  const navigate = useNavigate();
  const showedPassword = "•".repeat(password.length);
  const showedPasswordCheck = "•".repeat(passwordCheck.length);
  const { title, submitButtonText, optionButtonText } = optionalTexts[signOption];
  const { setMessage, ErrorMessage } = useErrorMessage({ receivedMessage, disapperTime: 2000 });

  const navigateToOtherOption = () => {
    setPasswordCheck("");
    setPassword("");
    setEmail("");
    changeSignOption();
  };

  const checkSign = async (event: FormEvent) => {
    event.preventDefault();
    if (!isSubmitPossible) return;

    const { isSuccess, errorMessage } = await sign({ email, password, signOption });
    if (isSuccess && signOption === "signin") {
      navigate(pathName.todo);
    } else if (isSuccess && signOption === "signup") {
      navigateToOtherOption();
      setMessage(successToSignUp);
    } else if (errorMessage) {
      const failMention = signOption === "signin" ? failToLogin : failToSignUp;
      setMessage(`${failMention} (${errorMessage})`);
    }
  };

  const checkIsInfoCorrectFormat = () => {
    const isEmailCorrectFormat = isEmailExp(email);
    const isPasswordCorrectFormat = password.length >= 8;
    const isSamePassword = signOption === "signin" || password === passwordCheck;
    let newMessage;

    if (!isEmailCorrectFormat) {
      newMessage = incorrectEmailFormat;
    } else if (!isPasswordCorrectFormat) {
      newMessage = incorrectPasswordLength;
    } else if (!isSamePassword) {
      newMessage = incorrectPassword;
    }

    if (newMessage) {
      setMessage(newMessage);
    } else {
      setIsSubmitPossible(true);
    }
  };

  const handleClickOptionButton = useCallback(
    (event?: MouseEvent<HTMLButtonElement>) => {
      event && event.preventDefault();
      navigateToOtherOption();
    },
    [signOption],
  );

  useEffect(() => {
    setIsSubmitPossible(false);
  }, [email, password, passwordCheck]);

  useDebounce({ func: checkIsInfoCorrectFormat, delay: 500, deps: [email, password] });

  return (
    <S.SignForm onSubmit={checkSign}>
      <S.Title>{title}</S.Title>
      <S.Input placeholder={EMAIL} onChange={onChangeEmail} value={email} />
      <S.Input placeholder={PASSWORD} onChange={onChangePassword} value={showedPassword} />
      {signOption === "signup" && (
        <S.Input
          placeholder={PASSWORDCHECK}
          onChange={onChangePasswordCheck}
          value={showedPasswordCheck}
        />
      )}
      <S.ButtonsWrapper>
        <Button text={submitButtonText} color='yellow' disabled={!isSubmitPossible} />
        <Button onClick={handleClickOptionButton} text={optionButtonText} color='blue' />
      </S.ButtonsWrapper>
      <ErrorMessage />
    </S.SignForm>
  );
};

export default SignForm;
