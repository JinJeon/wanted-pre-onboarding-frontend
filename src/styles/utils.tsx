import { css } from "styled-components";

export const standardHeight = "2rem";

export const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const flexBetween = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const noScrollBar = css`
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;
