import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";

import { useNavigate } from "react-router-dom";

import { SignOptionType, sign } from "@api/auth";
import Button from "@components/Button";
import * as S from "@components/SignForm/SignForm.style";
import { CANCEL, EMAIL, PASSWORD, SIGNIN, SIGNUP } from "@constants/words";
import { useDebounce } from "@hooks/useDebounce";
import { pathName } from "@router";

type SignFormPropsType = {
  signOption: SignOptionType;
  onClickOptionButton: () => void;
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

const SignForm = ({ signOption, onClickOptionButton, receivedMessage }: SignFormPropsType) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(receivedMessage || "");
  const navigate = useNavigate();
  const { title, submitButtonText, optionButtonText } = optionalTexts[signOption];

  const checkValues = async (event: FormEvent) => {
    event.preventDefault();
    const { isSuccess, errorMessage } = await sign({ email, password, signOption });
    if (isSuccess) {
      navigate(pathName.todo);
    } else if (errorMessage) {
      setMessage(errorMessage);
    }
  };

  const changeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEmail(value);
  };

  const changePassword = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPassword(value);
  };

  const handleClickOptionButton = (event?: MouseEvent<HTMLButtonElement>) => {
    event && event.preventDefault();
    setPassword("");
    setEmail("");
    onClickOptionButton();
  };

  const removeMessage = () => {
    if (!!message.length) setMessage("");
  };

  useDebounce({ func: removeMessage, delay: 3000, deps: [message] });

  return (
    <S.SignForm onSubmit={checkValues}>
      <S.Title>{title}</S.Title>
      <S.Input placeholder={EMAIL} onChange={changeEmail} value={email} />
      <S.Input placeholder={PASSWORD} onChange={changePassword} value={password} />
      <S.ButtonsWrapper>
        <Button onClick={handleClickOptionButton} text={optionButtonText} color='blue' />
        <Button text={submitButtonText} color='yellow' />
      </S.ButtonsWrapper>
      <S.ErrorMessage isError={!!message.length}>{message}</S.ErrorMessage>
    </S.SignForm>
  );
};

export default SignForm;
