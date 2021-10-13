import React, { useState, useEffect, useMemo, forwardRef } from "react"
import withStyles from "react-jss"
import { Table, BarChart } from "../components"
import {
  MONTH_LABELS,
  FASHION_BRANDS,
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
    maxHeight: "1200px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  wordCloud: {
    width: "90%",
  },
}

const Section1 = ({ classes }, ref) => {
  const [mode, setMode] = useState("viz") // viz || table

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      if (brand === FASHION_BRANDS[0]) {
        return (
          <img
            className={classes.wordCloud}
            src={AllBrandsWC}
            alt="Word cloud of all brand's top keywords"
          />
        )
      } else if (brand === FASHION_BRANDS[1]) {
        return (
          <img
            className={classes.wordCloud}
            src={AllureWC}
            alt="Word cloud of Allure's top keywords"
          />
        )
      } else if (brand === FASHION_BRANDS[2]) {
        return (
          <img
            className={classes.wordCloud}
            src={GlamourWC}
            alt="Word cloud of Glamour's top keywords"
          />
        )
      } else if (brand === FASHION_BRANDS[3]) {
        return (
          <img
            className={classes.wordCloud}
            src={VogueWC}
            alt="Word cloud of Vogue's top keywords"
          />
        )
      }
      return null
    }
    return null
  }

  const renderTwitterWordCloud = ({ month }) => {
    if (month === MONTH_LABELS[0]) {
      return (
        <img
          className={classes.wordCloud}
          src={TwitterWC}
          alt="Word cloud of top tweet's top keywords"
        />
      )
    }
    return null
  }

  return (
    <div className={classes.container} ref={ref}>
      <div className={classes.wrapper}>
        <h1 className={classes.sectionTitle}>
          Percentage of Articles & Tweets by Topic
        </h1>
        <p className={classes.description}>
          The tables below show Condé Nast and Twitter topic categories,
          alongside the percentage of articles or tweets that topic makes up on
          their respective platforms/sites. We focus on the{" "}
          <b>fashion category</b> in this dashboard, with aligned topics from
          Condé and Twitter. The topics are derived from Condé Nast’s Admantx
          taxonomy and Twitter’s trending topics list. You can filter by month
          and brand (Allue, Glamour, Vogue).
        </p>
        <div className={classes.filters}>
          <button
            className={`${mode === "viz" ? classes.activeButton : ""} ${
              classes.button
            }`}
            onClick={() => setMode("viz")}>
            Visualize the data!
          </button>
          <button
            className={`${mode === "table" ? classes.activeButton : ""} ${
              classes.button
            }`}
            onClick={() => setMode("table")}>
            Data as a table
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
                  filters.brand === FASHION_BRANDS[0] ? "Condé" : filters.brand
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
                      ? "Condé"
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

export default withStyles(styles)(forwardRef(Section1))
