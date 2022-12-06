const fonts = {};
const colors = {
  white: "#ffffff",
  grey0: "#d7d4d4",
  grey1: "#757575",
  yellow: "#FDB301",
  blue: "#4E8999",
  red: "#d17373",
};
const theme = { colors, fonts };

type ThemeType = typeof theme;
type FontsType = keyof typeof fonts;
type ColorsType = keyof typeof colors;

export type { ThemeType, ColorsType, FontsType };
export default theme;
