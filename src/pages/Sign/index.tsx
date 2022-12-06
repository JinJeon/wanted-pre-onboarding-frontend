import { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { checkIsLogin, SignOptionType } from "@api/auth";
import SignForm from "@components/SignForm";
import * as S from "@pages/Sign/Sign.style";
import { pathName } from "@router";

const Sign = () => {
  const navigate = useNavigate();
  const { state: receivedMessage } = useLocation() as { state?: SignOptionType };
  const [signOption, setSignOption] = useState<SignOptionType>("signin");
  const isLogin = checkIsLogin();

  const changeSignOption = () => {
    setSignOption(signOption === "signin" ? "signup" : "signin");
  };

  useEffect(() => {
    if (isLogin) navigate(pathName.todo);
  }, []);

  return (
    <S.Wrapper>
      <SignForm
        signOption={signOption}
        changeSignOption={changeSignOption}
        receivedMessage={receivedMessage}
      />
    </S.Wrapper>
  );
};

export default Sign;
