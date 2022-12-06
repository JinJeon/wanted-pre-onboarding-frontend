import { MouseEvent } from "react";

import * as S from "@components/Button/Button.style";
import { ColorsType } from "@styles/theme";

type ButtonPropsType = {
  color: ColorsType;
  text: string;
  onClick?: (event?: MouseEvent<HTMLButtonElement>) => void;
};

const Button = ({ color, text, onClick }: ButtonPropsType) => {
  return (
    <S.Wrapper color={color} onClick={onClick}>
      {text}
    </S.Wrapper>
  );
};

export default Button;
