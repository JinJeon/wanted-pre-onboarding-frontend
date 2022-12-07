import { useState } from "react";

import * as S from "@components/ErroMessage/ErroMessage.style";
import { useDebounce } from "@hooks/useDebounce";

type ErrorMessagePropsType = {
  receivedMessage?: string;
  disapperTime?: number; //ms
};

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
