import React, { useRef, lazy, Suspense } from "react"
import withStyles from "react-jss"
import fonts from "./assets/fonts"
import globalStyles from "./data/globalStyles"
import ErrorBoundary from "./ErrorBoundary"
import FallBack from "./Fallback"
import Header from "./layouts/Header"
import Intro from "./layouts/Intro"
import Section1 from "./layouts/Section1"

const Section2 = lazy(() => import("./layouts/Section2"))
const Section3 = lazy(() => import("./layouts/Section3"))

const styles = {
  ...fonts,
  ...globalStyles,
  app: {},
}

const App = ({ classes }) => {
  const ref1 = useRef(null)
  const ref2 = useRef(null)
  const ref3 = useRef(null)
  return (
    <div className={classes.app}>
      <Header />
      <Intro />
      <Section1 ref={ref1} />
      <ErrorBoundary>
        <Suspense fallback={<FallBack text="Fetching numbers..." />}>
          <Section2 ref={ref2} />
          <Section3 ref={ref3} />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}

export default withStyles(styles)(App)
