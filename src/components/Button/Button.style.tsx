import styled, { css } from "styled-components";

import { ColorsType } from "@styles/theme";

export const Wrapper = styled.button<{ color: ColorsType }>`
  ${({ theme: { colors }, color }) => css`
    background-color: ${colors[color]};
    width: 100%;
    height: 2rem;
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
