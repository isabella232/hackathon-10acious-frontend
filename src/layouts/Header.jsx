import React from "react"
import withStyles from "react-jss"
import colors from "../data/colors"
import { Hero } from "../assets/images"
import { borderRadius } from "../data/globalStyles"

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: "100vh",
    width: "100vw",
    background: `url(${Hero}) no-repeat center center fixed`,
    backgroundSize: "cover",
  },
  intro: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: "3rem 4rem",
    maxWidth: "1000px",
    borderRadius: borderRadius,
    backgroundColor: colors.white,
    opacity: 0.9,
    "@media only screen and (max-width: 720px)": {
      width: "100%",
      maxWidth: "100%",
      padding: "0 0 1.3rem 0",
    },
  },
  heading: {
    fontSize: "calc(30px + (44 - 30) * ((100vw - 300px) / (1600 - 300)))",
    fontWeight: 600,
    margin: "0.3rem 0 0 0",
    textAlign: "center",
    textDecoration: "underline",
    textDecorationColor: colors.twitterBlue,
  },
  subheading: {
    fontSize: "calc(15px + (25 - 15) * ((100vw - 300px) / (1600 - 300)))",
    margin: "1rem 0",
    textAlign: "center",
    textDecorationColor: colors.white,
  },
}

const Header = ({ classes }) => {
  return (
    <header className={classes.container}>
      <div className={classes.intro}>
        <h1 className={classes.heading}>Trending Topics Prediction</h1>
        <h4 className={classes.subheading}>to promote content diversity</h4>
      </div>
    </header>
  )
}

export default withStyles(styles)(Header)
