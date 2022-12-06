import { ChangeEvent, FormEvent, MouseEvent, useCallback, useState } from "react";

import { useNavigate } from "react-router-dom";

import { SignOptionType, sign } from "@api/auth";
import Button from "@components/Button";
import * as S from "@components/SignForm/SignForm.style";
import { failToLogin, successToSignUp } from "@constants/sentences";
import { CANCEL, EMAIL, PASSWORD, SIGNIN, SIGNUP } from "@constants/words";
import { useDebounce } from "@hooks/useDebounce";
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

type ChangeInfoParamsType = {
  event: ChangeEvent<HTMLInputElement>;
  target: "email" | "password";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(receivedMessage || "");
  const [isSubmitPossible, setIsSubmitPossible] = useState(false);
  const navigate = useNavigate();
  const { title, submitButtonText, optionButtonText } = optionalTexts[signOption];
  const showedPassword = "•".repeat(password.length);

  const navigateToOtherOption = () => {
    setPassword("");
    setEmail("");
    changeSignOption();
  };

  const checkSign = async (event: FormEvent) => {
    event.preventDefault();

    const { isSuccess, errorMessage } = await sign({ email, password, signOption });

    if (isSuccess && signOption === "signin") {
      navigate(pathName.todo);
    } else if (isSuccess && signOption === "signup") {
      navigateToOtherOption();
      setMessage(successToSignUp);
    } else if (errorMessage) {
      setMessage(`${failToLogin}(${errorMessage})`);
    }
  };

  const checkIsInfoCorrectFormat = () => {
    const isEmailCorrectFormat = isEmailExp(email);
    const isPasswordCorrectFormat = password.length >= 8;
    if (isEmailCorrectFormat && isPasswordCorrectFormat) setIsSubmitPossible(true);
  };

  const changeInfo = ({ event, target }: ChangeInfoParamsType) => {
    setIsSubmitPossible(false);
    const { value } = event.target;
    const targetSetter = {
      email: setEmail,
      password: setPassword,
    };
    targetSetter[target](value);
  };

  const removeMessage = () => {
    if (!!message.length) setMessage("");
  };

  const handleClickOptionButton = useCallback(
    (event?: MouseEvent<HTMLButtonElement>) => {
      event && event.preventDefault();
      navigateToOtherOption();
    },
    [signOption],
  );

  useDebounce({ func: removeMessage, delay: 3000, deps: [message] });
  useDebounce({ func: checkIsInfoCorrectFormat, delay: 500, deps: [email, password] });

  return (
    <S.SignForm onSubmit={checkSign}>
      <S.Title>{title}</S.Title>
      <S.Input
        placeholder={EMAIL}
        onChange={(event) => changeInfo({ event, target: "email" })}
        value={email}
      />
      <S.Input
        placeholder={PASSWORD}
        onChange={(event) => changeInfo({ event, target: "password" })}
        value={showedPassword}
      />
      <S.ButtonsWrapper>
        <Button text={submitButtonText} color='yellow' disabled={!isSubmitPossible} />
        <Button onClick={handleClickOptionButton} text={optionButtonText} color='blue' />
      </S.ButtonsWrapper>
      <S.ErrorMessage isError={!!message.length}>{message}</S.ErrorMessage>
    </S.SignForm>
  );
};

export default SignForm;
