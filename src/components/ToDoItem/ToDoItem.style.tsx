import styled, { css } from "styled-components";

import { TodoDataType } from "@api/todo";
import { flexBetween, noScrollBar, standardHeight } from "@styles/utils";

export const Wrapper = styled.div<{ isEdited: boolean }>`
  ${flexBetween};
  ${({ theme: { colors }, isEdited }) => css`
    background-color: ${colors.white};
    width: 100%;
    padding: 0.25rem;
    height: ${standardHeight};
    border: 0.2rem solid transparent;
    border-radius: 0.5rem;
    gap: 0.5rem;

    ${isEdited &&
    css`
      border: 0.2rem dashed ${colors.yellow};
    `}
  `}
`;

export const ToDoTextWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  width: 100%;
  overflow: hidden;
`;

export const ToDoText = styled.div<Pick<TodoDataType, "isCompleted">>`
  ${noScrollBar};
  display: flex;
  font-size: 0.8rem;
  align-items: center;
  overflow-x: scroll;
  white-space: nowrap;
  height: 100%;

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

export const CheckBox = styled.input`
  ${({ theme: { colors } }) => css`
    appearance: none;
    min-width: 1rem;
    width: 1rem;
    height: 1rem;
    border: 0.1rem solid gainsboro;
    border-radius: 0.25rem;
    transition: all 0.25s;

    &:checked {
      border-color: transparent;
      background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
      background-size: 125%;
      background-position: 50%;
      background-repeat: no-repeat;
      background-color: ${colors.yellow};
    }
  `}
`;

export const Input = styled.input`
  border: transparent;
  padding: 0;
  font-size: 0.8rem;
  width: 100%;

  &:focus {
    outline: none;
    ::placeholder {
      color: transparent;
    }
  }
`;
