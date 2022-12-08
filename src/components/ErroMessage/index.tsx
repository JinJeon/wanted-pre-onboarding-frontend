import { useContext, useEffect } from "react";

import * as S from "@components/ErroMessage/ErroMessage.style";
import { useDebounce } from "@hooks/useDebounce";
import { ErrorMessageContext, SetErrorMessageContext } from "@store/errorMessage";

type ErrorMessagePropsType = {
  receivedMessage?: string;
  disapperTime?: number; //ms
};

const ErrorMessage = ({ receivedMessage, disapperTime = 3000 }: ErrorMessagePropsType) => {
  const { message, trigger } = useContext(ErrorMessageContext);
  const setErrorMessage = useContext(SetErrorMessageContext);

  const removeMessage = () => {
    if (!!message.length) setErrorMessage("");
  };

  useDebounce({ func: removeMessage, delay: disapperTime, deps: [trigger] });

  useEffect(() => {
    if (receivedMessage) setErrorMessage(receivedMessage);
  }, []);

  return <S.Wrapper isError={!!message.length}>{message}</S.Wrapper>;
};

export default ErrorMessage;
