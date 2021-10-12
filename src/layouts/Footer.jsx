import React from "react"
import withStyles from "react-jss"

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
}

const Footer = ({ classes }) => {
  return <div className={classes.container}></div>
}

export default withStyles(styles)(Footer)
