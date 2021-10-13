import React, { useState, useEffect, useMemo, forwardRef } from "react"
import withStyles from "react-jss"
import { isEqual } from "date-fns"
import { Calendar } from "react-date-range"
import "react-date-range/dist/styles.css" // main style file
import "react-date-range/dist/theme/default.css" // theme css file
import { forecast } from "../data/forecast"
import { formatForecastData } from "../utils/helper"
import { PredictionsBarChart } from "../components"

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    margin: "4rem 0",
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: "1100px",
  },
  sectionTitle: {
    fontSize: "calc(22px + (32 - 22) * ((100vw - 300px) / (1600 - 300)))",
  },
  description: {
    lineHeight: "1.4",
  },
  filters: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    marginBottom: "1rem",
    "@media only screen and (max-width: 800px)": {
      flexWrap: "wrap",
    },
  },
  vizContainer: {
    width: "100%",
    minHeight: "70vh",
  },
  dateRange: {
    marginTop: "1.6rem",
  },
}

const Section3 = ({ classes }, ref) => {
  const [activeDate, setActiveDate] = useState(new Date(2021, 9, 1))
  const FORECAST_DATA = useMemo(() => formatForecastData(forecast), [])
  const [data, setData] = useState(() =>
    FORECAST_DATA.filter((d) => isEqual(new Date(2021, 9, 1), d.date))
  )

  const handleSelect = (date) => {
    setActiveDate(date)
  }

  useEffect(() => {
    setData(FORECAST_DATA.filter((d) => isEqual(activeDate, d.date)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeDate])

  return (
    <div className={classes.container} ref={ref}>
      <div className={classes.wrapper}>
        <h1 className={classes.sectionTitle}>Prediction Graph</h1>
        <p className={classes.description}>
          The below is a prediction graph for the next 29 days. Axis X shows the
          topics and Axis Y shows the expected percentage of tweets for the
          topic, which we refer to as pulse. The higher the pulse, the more
          likely that topic will trend. Select the date from the calendar on the
          left and our algorithm will tell you the topics that might trend on
          that day.
        </p>
        <p className={classes.description}>
          These predictions are based on 2021 data.
        </p>
        <div className={classes.filters}>
          <Calendar
            className={classes.dateRange}
            date={activeDate}
            onChange={handleSelect}
            minDate={new Date(2021, 9, 1)}
            maxDate={new Date(2021, 9, 29)}
          />
          <PredictionsBarChart data={data} />
        </div>
      </div>
    </div>
  )
}

export default withStyles(styles)(forwardRef(Section3))
