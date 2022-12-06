import { useNavigate } from "react-router-dom";

import Button from "@components/Button";
import * as S from "@pages/NotFound/NotFound.style";
import { pathName } from "@router";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <S.Wrapper>
      NOT FOUND
      <Button color='yellow' onClick={() => navigate(pathName.signin)} text='GO HOME' />
    </S.Wrapper>
  );
};

export default NotFound;
