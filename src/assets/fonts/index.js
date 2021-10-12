import Sora from "./Sora-Regular.ttf"
import SoraMedium from "./Sora-Medium.ttf"
import SoraSemiBold from "./Sora-SemiBold.ttf"
import SoraBold from "./Sora-Bold.ttf"
import SoraExtraBold from "./Sora-ExtraBold.ttf"
import AndadaPro from "./AndadaPro-Regular.ttf"
// import AndadaProSemiBold from "./AndadaPro-SemiBold.ttf"
// import AndadaProBold from "./AndadaPro-Bold.ttf"
// import AndadaProExtraBold from "./AndadaPro-ExtraBold.ttf"

const fonts = {
  "@font-face": [
    {
      fontFamily: "Sora",
      src: `url('${Sora}') format("woff")`,
      fontWeight: 400,
      fontStyle: "normal",
      fontDisplay: "swap",
    },
    {
      fontFamily: "Sora",
      src: `url('${SoraMedium}') format("woff")`,
      fontWeight: 500,
      fontStyle: "normal",
      fontDisplay: "swap",
    },
    {
      fontFamily: "Sora",
      src: `url('${SoraSemiBold}') format("woff")`,
      fontWeight: 600,
      fontStyle: "normal",
      fontDisplay: "swap",
    },
    {
      fontFamily: "Sora",
      src: `url('${SoraBold}') format("woff")`,
      fontWeight: 700,
      fontStyle: "normal",
      fontDisplay: "swap",
    },
    {
      fontFamily: "Sora",
      src: `url('${SoraExtraBold}') format("woff")`,
      fontWeight: 800,
      fontStyle: "normal",
      fontDisplay: "swap",
    },
    {
      fontFamily: "AndadaPro",
      src: `url('${AndadaPro}') format("woff")`,
      fontWeight: 400,
      fontStyle: "normal",
      fontDisplay: "swap",
    },
  ],
}

export default fonts
