import { createGlobalStyle, css } from "styled-components";

import "@styles/animations.css";
import { flexCenter } from "./utils";

const GlobalStyle = createGlobalStyle`
	${() => css`
    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu",
        "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    code {
      font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
    }

    * {
      box-sizing: border-box;
      box-sizing: border-box;
      box-sizing: border-box;
    }

    .App {
      padding: 1rem;
      height: 100vh;
      font-weight: 700;
      ${flexCenter};
    }

    button,
    input {
      font-weight: 600;
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
