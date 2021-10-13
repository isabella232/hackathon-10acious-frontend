import React, { useState, useEffect, useMemo } from "react"
import withStyles from "react-jss"
import { Table, BarChart } from "../components"
import {
  MONTH_LABELS,
  FASHION_BRANDS,
  TABLE_HEADINGS,
  TABLE_HEADINGS_TWITTER,
  TABLE_HEADINGS_CONDE,
} from "../data/filters"
import { condeTopicsDistribution } from "../data/conde-topics-distribution"
import { twitterTopicsDistribution } from "../data/twitter-topics-distribution"
import {
  stringCompare,
  formatData,
  formatBarChartData,
  formatBarChartTwitterData,
} from "../utils/helper"
import { borderRadius } from "../data/globalStyles"
import colors from "../data/colors"
import {
  AllBrandsWC,
  TwitterWC,
  GlamourWC,
  VogueWC,
  AllureWC,
} from "../assets/images"

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
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
  filters: {
    display: "flex",
    flexDirection: "row",
  },
  button: {
    margin: "0.8rem",
    marginLeft: 0,
    fontSize: "calc(12px + (18 - 12) * ((100vw - 300px) / (1600 - 300)))",
    padding: "0.5rem 1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    textAlign: "center",
    boxSizing: "border-box",
    transition: "background 0.2s ease-in-out, color 0.3s ease-in-out",
    border: `2px solid ${colors.purple}`,
    background: colors.white,
    color: colors.purple,
    borderRadius: borderRadius,
  },
  activeButton: {
    backgroundColor: colors.purple,
    color: colors.white,
  },
  dataTable: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    // flexDirection: "column",
    width: "100%",
    "@media only screen and (max-width: 650px)": {
      flexWrap: "wrap",
    },
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
  vizContainer: {
    width: "50%",
    height: "120vh",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
}

const Section1 = ({ classes }) => {
  const [mode, setMode] = useState("table") // viz || table

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
  const INITIAL_TWITTER_DATA = useMemo(
    () => formatData(twitterTopicsDistribution, 1, "twitter"),
    []
  )
  const [data, setData] = useState(INITIAL_DATA)
  const [twitterData, setTwitterData] = useState(INITIAL_TWITTER_DATA)

  const [barChartData, setBarChartData] = useState(() => data)
  const [twitterBarChartData, setTwitterBarChartData] = useState(() => data)

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
    setTwitterData(
      INITIAL_TWITTER_DATA.filter((d) => stringCompare(d.month, month))
    )
  }, [filters])

  useEffect(() => {
    const barChart = formatBarChartData(data)
    setBarChartData(barChart)
  }, [data])

  useEffect(() => {
    const barChart = formatBarChartTwitterData(twitterData)
    setTwitterBarChartData(barChart)
  }, [twitterData])

  const renderBrandWordCloud = ({ month, brand }) => {
    if (month === MONTH_LABELS[0]) {
      if (brand === FASHION_BRANDS[1]) {
        return <img src={AllureWC} alt="Word cloud of Allure's top keywords" />
      } else if (brand === FASHION_BRANDS[2]) {
        return (
          <img src={GlamourWC} alt="Word cloud of Glamour's top keywords" />
        )
      } else if (brand === FASHION_BRANDS[3]) {
        return <img src={VogueWC} alt="Word cloud of Vogue's top keywords" />
      }
      return null
    }
    return null
  }

  const renderTwitterWordCloud = ({ month }) => {
    if (month === MONTH_LABELS[0]) {
      return (
        <img src={TwitterWC} alt="Word cloud of top tweet's top keywords" />
      )
    }
    return null
  }

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h1 className={classes.sectionTitle}>Section 1</h1>
        <p className={classes.description}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
        <div className={classes.filters}>
          <button
            className={`${mode === "table" ? classes.activeButton : ""} ${
              classes.button
            }`}
            onClick={() => setMode("table")}>
            Data as a table!
          </button>
          <button
            className={`${mode === "viz" ? classes.activeButton : ""} ${
              classes.button
            }`}
            onClick={() => setMode("viz")}>
            Visualize the data!
          </button>
        </div>
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
          {mode === "table" ? (
            <>
              <Table
                title={
                  filters.brand === FASHION_BRANDS[0] ? "Conde" : filters.brand
                }
                columns={TABLE_HEADINGS_CONDE}
                data={data}
                section={1}
              />
              <Table
                title="Twitter"
                columns={TABLE_HEADINGS_TWITTER}
                data={twitterData}
                section={1}
              />
            </>
          ) : (
            <>
              <div className={classes.vizContainer}>
                <BarChart
                  data={barChartData}
                  title={
                    filters.brand === FASHION_BRANDS[0]
                      ? "Conde"
                      : filters.brand
                  }
                />
                {renderBrandWordCloud(filters)}
              </div>
              <div className={classes.vizContainer}>
                <BarChart data={twitterBarChartData} title="Twitter" />
                {renderTwitterWordCloud(filters)}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default withStyles(styles)(Section1)
