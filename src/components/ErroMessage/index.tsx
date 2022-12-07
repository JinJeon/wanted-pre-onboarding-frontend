import { useState } from "react";

import * as S from "@components/ErroMessage/ErroMessage.style";
import { useDebounce } from "@hooks/useDebounce";

type ErrorMessagePropsType = {
  receivedMessage?: string;
  disapperTime?: number; //ms
};

/** hooks 형식으로 사용되는 컴포넌트입니다. ErrorMessage를 꺼내서 컴포넌트로 사용하셔야 합니다. */
const useErrorMessage = ({ receivedMessage, disapperTime = 3000 }: ErrorMessagePropsType) => {
  const [message, setMessage] = useState(receivedMessage || "");

  const removeMessage = () => {
    if (!!message.length) setMessage("");
  };

  useDebounce({ func: removeMessage, delay: disapperTime, deps: [message] });

  const ErrorMessage = () => <S.Wrapper isError={!!message.length}>{message}</S.Wrapper>;

  return { message, setMessage, receivedMessage, ErrorMessage };
};

export default useErrorMessage;
