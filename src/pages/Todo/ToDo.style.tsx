import styled, { css } from "styled-components";

import { flexCenter, standardHeight } from "@styles/utils";

export const Wrapper = styled.div`
  ${({ theme: { colors } }) => css`
    background-color: ${colors.grey0};
    margin: auto;
    height: 80%;
    width: 80%;
    min-width: 20rem;
    max-width: 40rem;
    border-radius: 1.5rem;
    padding: 1rem;
  `}
`;

export const Title = styled.h2`
  ${flexCenter};
  font-size: 1.25rem;
  height: 3rem;
`;

export const ListWrapper = styled.div`
  display: flex;
`;

export const ToDoForm = styled.form`
  ${flexCenter};
  ${({ theme: { colors } }) => css`
    background-color: ${colors.white};
    gap: 0.25rem;
    height: ${standardHeight};
    width: 100%;
    padding: 0.5rem;
    border-radius: 0.5rem;
  `}
`;

export const Input = styled.input`
  border: transparent;
  width: 100%;

  &:focus {
    outline: none;
    ::placeholder {
      color: transparent;
    }
  }
`;

export const SubmitButton = styled.button`
  ${flexCenter}
`;
