import { createContext, ReactNode, useState } from "react";

type ErrorMessageType = {
  message: string;
  trigger: number;
};

type SetErroeMessageType = (newMessage: string) => void;

const defaultErrorMessage = { message: "", trigger: 0 };

export const ErrorMessageContext = createContext<ErrorMessageType>(defaultErrorMessage);
export const SetErrorMessageContext = createContext<SetErroeMessageType>(() => null);

export const ErrorMessageProvider = ({ children }: { children: ReactNode }) => {
  const [errorMessage, setErrorMessage] = useState(defaultErrorMessage);

  const setNewErrorMessage = (newMessage: string) =>
    setErrorMessage(({ trigger }) => ({
      message: newMessage,
      trigger: trigger + 1,
    }));

  return (
    <ErrorMessageContext.Provider value={errorMessage}>
      <SetErrorMessageContext.Provider value={setNewErrorMessage}>
        {children}
      </SetErrorMessageContext.Provider>
    </ErrorMessageContext.Provider>
  );
};
