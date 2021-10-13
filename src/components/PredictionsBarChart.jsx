import React from "react"
import withStyles from "react-jss"
import { ResponsiveBar } from "@nivo/bar"

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: "80vh",
    width: "100%",
    marginBottom: "2rem",
  },
}

const PredictionsBarChart = ({ classes, data }) => {
  return (
    <div className={classes.container}>
      <ResponsiveBar
        data={data}
        keys={["value"]}
        indexBy="admantx"
        margin={{ top: 50, right: 30, bottom: 300, left: 65 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "nivo" }}
        colorBy="indexValue"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 90,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Percentage",
          legendPosition: "middle",
          legendOffset: -50,
        }}
      />
    </div>
  )
}

export default withStyles(styles)(PredictionsBarChart)
