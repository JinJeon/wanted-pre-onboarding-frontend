const fonts = {};
const colors = {};
const theme = {};

type ThemeType = typeof theme;
type FontsType = keyof typeof fonts;
type ColorsType = keyof typeof colors;

export type { ThemeType, ColorsType, FontsType };
export default theme;
