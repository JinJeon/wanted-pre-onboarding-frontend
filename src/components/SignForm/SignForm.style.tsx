import styled, { css } from "styled-components";

import { flexCenter } from "@styles/utils";

const commonHeight = "2rem";

export const SignForm = styled.form`
  ${({ theme: { colors } }) => css`
    ${flexCenter};
    padding: 3rem;
    flex-direction: column;
    gap: 0.75rem;
    background-color: ${colors.grey0};
    width: 20rem;
    height: 20rem;
    border-radius: 1.5rem;
  `}
`;

export const Title = styled.h2`
  text-align: center;
  width: 100%;
  margin-bottom: 1rem;
`;

export const Input = styled.input`
  border-radius: 0.5rem;
  padding: 0.25rem;
  width: 100%;
  height: ${commonHeight};
  border: transparent;

  &:focus {
    outline: none;
    ::placeholder {
      color: transparent;
    }
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 0.75rem;
`;

export const SubmitButton = styled.button`
  ${({ theme: { colors } }) => css`
    background-color: ${colors.yellow};
    width: 100%;
    height: ${commonHeight};
    border-radius: 0.5rem;
    opacity: 0.8;

    :disabled {
      opacity: 0.5;
    }

    :hover,
    :active {
      opacity: 1;
    }
  `}
`;

export const OptionButton = styled.button`
  ${({ theme: { colors } }) => css`
    background-color: ${colors.blue};
    width: 100%;
    height: ${commonHeight};
    border-radius: 0.5rem;
    opacity: 0.8;

    :disabled {
      opacity: 0.5;
    }

    :hover,
    :active {
      opacity: 1;
    }
  `}
`;

export const ErrorMessage = styled.div<{ isError: boolean }>`
  ${({ theme: { colors }, isError }) => css`
    background-color: ${colors.red};
    height: ${commonHeight};
    line-height: 1.5rem;
    border-radius: 0.5rem;
    width: 100%;
    padding: 0.25rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 0.8rem;
    font-weight: 700;

    ${!isError &&
    css`
      visibility: hidden;
    `}
  `}
`;
