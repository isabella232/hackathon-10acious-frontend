import React from "react"
import withStyles from "react-jss"

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: "100vh",
    width: "100vw",
  },
  content: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginTop: "-6rem",
    textAlign: "center",
  },
  heading: {
    // margin: 0,
  },
  subHeading: {
    margin: 0,
    fontSize: "calc(16px + (24 - 16) * ((100vw - 300px) / (1600 - 300)))",
  },
}

const Header = ({ classes }) => {
  return (
    <header className={classes.container}>
      <div className={classes.content}>
        <h1 className={classes.heading}>Trending topics prediction</h1>
        <h3 className={classes.subHeading}>to promote content diversity</h3>
      </div>
    </header>
  )
}

export default withStyles(styles)(Header)
