import colors from "./colors"

const globalStyles = {
  "@global": {
    body: {
      margin: 0,
    },
    "h1, h2, h3, h4, h5, h6": {
      fontFamily: "AndadaPro, serif",
    },
    h1: {
      fontSize: "calc(44px + 2vmin)",
    },
    p: {
      fontFamily: "sans-serif",
      fontSize: "20px",
    },
    body: {
      fontFamily: "Sora",
      color: colors.black,
    },
  },
}

export const borderRadius = "10px"

export default globalStyles
