import styled, { css } from "styled-components";

import { flexBetween, noScrollBar, standardHeight } from "@styles/utils";

export const Wrapper = styled.div`
  ${flexBetween};
  ${({ theme: { colors } }) => css`
    background-color: ${colors.white};
    width: 100%;
    padding: 0.5rem;
    height: ${standardHeight};
    border: 0.1rem solid transparent;
    border-radius: 0.5rem;
    gap: 0.5rem;
  `}
`;

export const ToDoWrapper = styled.div`
  ${noScrollBar};
  word-break: keep-all;
  overflow: scroll;
`;

export const ButtonsWrapper = styled.div`
  ${flexBetween};
  gap: 0.5rem;
`;
