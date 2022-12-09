import styled, { css } from "styled-components";

import { standardHeight } from "@styles/utils";

export const Wrapper = styled.div<{ isError: boolean }>`
  ${({ theme: { colors }, isError }) => css`
    background-color: ${colors.red};
    display: flex;
    align-items: center;
    min-height: ${standardHeight};
    border-radius: 0.5rem;
    width: 100%;
    padding: 0.4rem;
    font-size: 0.8rem;

    ${!isError &&
    css`
      visibility: hidden;
    `}
  `}
`;
