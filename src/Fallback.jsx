import React from "react"
import withStyles from "react-jss"

const styles = {
  container: {
    width: "100%",
    height: "90vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  text: {
    textAlign: "center",
    maxWidth: "900px",
    fontSize: "calc(10px + 2vmin)",
  },
}

const FallBack = ({ classes, text }) => {
  return (
    <div className={classes.container}>
      <p className={classes.text}>{text}</p>
    </div>
  )
}

export default withStyles(styles)(FallBack)
