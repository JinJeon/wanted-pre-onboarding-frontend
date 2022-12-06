import styled from "styled-components";

import { flexCenter } from "@styles/utils";

export const Wrapper = styled.div`
  ${flexCenter}
  height: 100%;
  flex-direction: column;
  gap: 1rem;

  > button {
    width: 50%;
  }
`;
