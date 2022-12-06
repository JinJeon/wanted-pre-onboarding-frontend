import React, { MouseEvent } from "react";

import * as S from "@components/Button/Button.style";
import { ColorsType } from "@styles/theme";

type ButtonPropsType = {
  color: ColorsType;
  text: string;
  disabled?: boolean;
  onClick?: (event?: MouseEvent<HTMLButtonElement>) => void;
};

const Button = ({ color, text, onClick, disabled = false }: ButtonPropsType) => {
  return (
    <S.Wrapper color={color} onClick={onClick} disabled={disabled}>
      {text}
    </S.Wrapper>
  );
};

export default React.memo(Button);
