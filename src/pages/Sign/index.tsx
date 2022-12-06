import { useState } from "react";

import { useLocation } from "react-router-dom";

import { SignOptionType } from "@api/auth";
import SignForm from "@components/SignForm";
import * as S from "@pages/Sign/Sign.style";

const Sign = () => {
  const { state: receivedMessage } = useLocation() as { state?: SignOptionType };
  const [signOption, setSignOption] = useState<SignOptionType>("signin");

  const changeSignOption = () => {
    setSignOption(signOption === "signin" ? "signup" : "signin");
  };

  return (
    <S.Wrapper>
      <SignForm
        signOption={signOption}
        onClickOptionButton={changeSignOption}
        receivedMessage={receivedMessage}
      />
    </S.Wrapper>
  );
};

export default Sign;
