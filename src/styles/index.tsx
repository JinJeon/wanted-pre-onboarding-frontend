import { ReactNode } from "react";

import { ThemeProvider } from "styled-components";

import GlobalStyle from "@styles/GlobalStyle";
import Reset from "@styles/Reset";
import theme from "@styles/theme";

const Styles = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <Reset />
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

export default Styles;
