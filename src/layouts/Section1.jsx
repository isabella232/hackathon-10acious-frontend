import React, { useState, useEffect, useMemo } from "react"
import withStyles from "react-jss"
import { Table } from "../components"
import { MONTH_LABELS, FASHION_BRANDS, TABLE_HEADINGS } from "../data/filters"
import { condeTopicsDistribution } from "../data/conde-topics-distribution"
import { stringCompare, formatData } from "../utils/helper"
import { borderRadius } from "../data/globalStyles"
import colors from "../data/colors"

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  sectionTitle: {
    fontSize: "calc(18px + (28 - 18) * ((100vw - 300px) / (1600 - 300)))",
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
    maxWidth: "1100px",
  },
  select: {
    width: "100px",
    padding: "0.5rem 1rem",
    borderRadius: borderRadius,
    color: colors.black,
    // reset styles
    boxSizing: "content-box",
    margin: "0.5rem",
    border: `1px solid ${colors.lightGrey}`,
    fontSize: "calc(12px + (18 - 12) * ((100vw - 300px) / (1600 - 300)))",
  },
}

const Section1 = ({ classes }) => {
  const months = MONTH_LABELS.map((d, i) => ({
    text: d,
    id: i,
  }))
  const brands = FASHION_BRANDS.map((d, i) => ({
    text: d,
    id: i,
  }))
  const [filters, setFilters] = useState({
    month: MONTH_LABELS[0],
    brand: FASHION_BRANDS[0],
  })

  const INITIAL_DATA = useMemo(
    () => formatData(condeTopicsDistribution, 1, "conde"),
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
      <h1 className={classes.sectionTitle}>Section 1</h1>
      <div className={classes.filters}>
        <select
          className={classes.select}
          value={filters.month}
          onChange={(e) => handleChange(e, "month")}>
          {months.map(({ id, text }) => (
            <option key={id} id={id}>
              {text}
            </option>
          ))}
        </select>
        <select
          className={classes.select}
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
        <Table columns={TABLE_HEADINGS} data={data} />
      </div>
    </div>
  )
}

export default withStyles(styles)(Section1)
