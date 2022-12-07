import styled, { css } from "styled-components";

import { flexCenter, noScrollBar } from "@styles/utils";

export const Wrapper = styled.div`
  ${({ theme: { colors } }) => css`
    background-color: ${colors.grey0};
    margin: auto;
    height: 80%;
    width: 80%;
    min-width: 20rem;
    max-width: 44rem;
    border-radius: 1.5rem;
    padding: 1rem;
    overflow: hidden;
  `}
`;

export const Title = styled.h2`
  ${flexCenter};
  font-size: 1.25rem;
  height: 3rem;
`;

export const ListWrapper = styled.div`
  ${noScrollBar};
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  overflow: scroll;
  height: inherit;
`;
