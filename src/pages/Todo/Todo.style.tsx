import styled, { css } from "styled-components";

import { flexCenter, noScrollBar } from "@styles/utils";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 30rem;
  height: 100%;
  min-width: 20rem;
  max-width: 44rem;
  width: 80%;
  margin: 0 auto;
`;

export const ToDoWrapper = styled.div`
  ${({ theme: { colors } }) => css`
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    background-color: ${colors.grey0};
    border-radius: 1.5rem;
    padding: 1rem;
    height: 24.5rem;
    overflow: hidden;
  `}
`;

export const ErrorMessageWrapper = styled.div``;

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
  ${flexCenter};
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
  border-radius: 0.5rem;
`;
