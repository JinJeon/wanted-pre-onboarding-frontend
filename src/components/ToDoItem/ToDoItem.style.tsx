import styled, { css } from "styled-components";

import { TodoDataType } from "@api/todo";
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

export const ToDoWrapper = styled.div<Pick<TodoDataType, "isCompleted">>`
  ${noScrollBar};
  overflow-x: scroll;
  white-space: nowrap;

  ${({ theme: { colors }, isCompleted }) =>
    isCompleted &&
    css`
      color: ${colors.grey1};
      text-decoration: line-through;
    `}
`;

export const ButtonsWrapper = styled.div`
  ${flexBetween};
  gap: 0.5rem;
`;
