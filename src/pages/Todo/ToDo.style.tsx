import styled, { css } from "styled-components";

import { noScrollBar } from "@styles/utils";

export const Wrapper = styled.div`
  ${({ theme: { colors } }) => css`
    background-color: ${colors.grey0};
    margin: auto;
    height: 80%;
    max-height: 30rem;
    width: 80%;
    min-width: 20rem;
    max-width: 44rem;
    border-radius: 1.5rem;
    padding: 1rem;
    overflow: hidden;
  `}
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 3rem;
  padding-bottom: 1rem;
`;

export const Title = styled.h2`
  font-size: 1.2rem;
`;

export const ButtonIcon = styled.button`
  width: 1.5rem;
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
  border-radius: 0.5rem;
`;
