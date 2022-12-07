import styled, { css } from "styled-components";

import { flexCenter, standardHeight } from "@styles/utils";

export const Wrapper = styled.form`
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
