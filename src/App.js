import React from "react"
import withStyles from "react-jss"
import fonts from "./assets/fonts"
import globalStyles from "./data/globalStyles"
import Section1 from "./layouts/Section1"

const styles = {
  ...fonts,
  ...globalStyles,
  app: {},
}

const App = ({ classes }) => {
  return (
    <div className={classes.app}>
      <Section1 />
    </div>
  )
}

export default withStyles(styles)(App)
