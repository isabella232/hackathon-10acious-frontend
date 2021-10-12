import React, { useState, useEffect, useMemo } from "react"
import withStyles from "react-jss"
import { Table } from "../components"
import { S2_TABLE_HEADINGS, S2_MONTHS, S2_BRANDS } from "../data/filters"
import { condeTrendsDistribution } from "../data/conde-trends-distribution"
import { stringCompare } from "../utils/helper"

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  filters: {
    display: "flex",
    flexDirection: "row",
  },
  dataTable: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    maxWidth: "1000px",
  },
}

const Section2 = ({ classes }) => {
  const [mode, setMode] = useState("table") // viz || table

  const months = S2_MONTHS.map((d, i) => ({
    text: d,
    id: i,
  }))
  const brands = S2_BRANDS.map((d, i) => ({
    text: d,
    id: i,
  }))
  const [filters, setFilters] = useState({
    month: S2_MONTHS[0],
    brand: S2_BRANDS[0],
  })

  const INITIAL_DATA = useMemo(
    () =>
      condeTrendsDistribution.map((d, i) => ({
        id: i,
        admantx: d.admantx,
        // admantx: d.admantx.split("::"),
        percent: `${(d.percentageOfPageviews * 100).toFixed(2)}%`,
        brand: d.brand.charAt(0).toUpperCase() + d.brand.slice(1),
        month: d.month,
      })),
    []
  )

  const [data, setData] = useState(INITIAL_DATA)

  const handleChange = (e, filterType) => {
    const data = e.target.value
    if (filterType === "month") {
      setFilters((d) => ({
        ...d,
        month: data,
      }))
    } else if (filterType === "brand") {
      setFilters((d) => ({
        ...d,
        brand: data,
      }))
    }
  }

  useEffect(() => {
    const { month, brand } = filters
    setData(
      INITIAL_DATA.filter(
        (d) => stringCompare(d.brand, brand) && stringCompare(d.month, month)
      )
    )
  }, [filters])

  return (
    <div className={classes.container}>
      <h1>Section 2</h1>
      <div className={classes.filters}>
        <button onClick={() => setMode("viz")}>Viz</button>
        <button onClick={() => setMode("table")}>Table</button>
      </div>
      <div className={classes.tableOrViz}>
        Explore monthwise / brandwise
        <div className={classes.filters}>
          <select
            value={filters.month}
            onChange={(e) => handleChange(e, "month")}>
            {months.map(({ id, text }) => (
              <option key={id} id={id}>
                {text}
              </option>
            ))}
          </select>
          <select
            value={filters.brand}
            onChange={(e) => handleChange(e, "brand")}>
            {brands.map(({ id, text }) => (
              <option key={id} id={id}>
                {text}
              </option>
            ))}
          </select>
        </div>
        <div className={classes.dataTable}>
          <Table columns={S2_TABLE_HEADINGS} data={data} />
        </div>
      </div>
    </div>
  )
}

export default withStyles(styles)(Section2)
