import React, { lazy, Suspense } from "react"
import withStyles from "react-jss"
import fonts from "./assets/fonts"
import globalStyles from "./data/globalStyles"
import ErrorBoundary from "./ErrorBoundary"
import FallBack from "./Fallback"
import Header from "./layouts/Header"
import Section1 from "./layouts/Section1"

const Section2 = lazy(() => import("./layouts/Section2"))

const styles = {
  ...fonts,
  ...globalStyles,
  app: {},
}

const App = ({ classes }) => {
  return (
    <div className={classes.app}>
      <Header />
      <Section1 />
      <ErrorBoundary>
        <Suspense fallback={<FallBack text="Fetching numbers..." />}>
          <Section2 />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}

export default withStyles(styles)(App)
