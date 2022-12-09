import { FormEvent, MouseEvent, useCallback, useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { SignOptionType, sign } from "@api/auth";
import Button from "@components/Button";
import ErrorMessage from "@components/ErroMessage";
import * as S from "@components/SignForm/SignForm.style";
import { failToLogin, failToSignUp, successToSignUp } from "@constants/sentences";
import { CANCEL, EMAIL, PASSWORD, PASSWORDCHECK, SIGNIN, SIGNUP } from "@constants/words";
import { useDebounce } from "@hooks/useDebounce";
import useInput from "@hooks/useInput";
import { pathName } from "@router";
import { SetErrorMessageContext } from "@store/errorMessage";
import { validateFormat } from "@utils/validateFormat";

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
  const setErrorMessage = useContext(SetErrorMessageContext);

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
      setErrorMessage(successToSignUp);
    } else if (errorMessage) {
      const failMention = signOption === "signin" ? failToLogin : failToSignUp;
      setErrorMessage(`${failMention} (${errorMessage})`);
    }
  };

  const checkInfoFormat = () => {
    const isValue = email.length || password.length;
    if (!isValue) return;

    const { isCorrect, errorMessage } = validateFormat({
      email,
      password,
      passwordCheck: signOption === "signup" && passwordCheck,
    });

    if (!isCorrect && errorMessage) {
      setErrorMessage(errorMessage);
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

  useDebounce({ func: checkInfoFormat, delay: 500, deps: [email, password, passwordCheck] });

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
      <ErrorMessage receivedMessage={receivedMessage} disapperTime={2000} />
    </S.SignForm>
  );
};

export default SignForm;
