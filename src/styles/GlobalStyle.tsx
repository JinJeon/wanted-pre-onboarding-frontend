import { createGlobalStyle, css } from "styled-components";

import "@styles/animations.css";
import "@assets/fonts/font.css";
import { flexCenter } from "./utils";

const GlobalStyle = createGlobalStyle`
	${() => css`
    code {
      font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
    }

    * {
      box-sizing: border-box;
      box-sizing: border-box;
      box-sizing: border-box;
    }

    .App {
      font-family: "Noto Sans KR";
      font-weight: 500;
      padding: 1rem;
      height: 100vh;
      ${flexCenter};
    }

    input,
    button {
      font-family: "Noto Sans KR";
      font-weight: 700;
    }

    button,
    svg {
      cursor: pointer;

      :disabled {
        cursor: not-allowed;
      }
    }
  `}`;

export default GlobalStyle;
