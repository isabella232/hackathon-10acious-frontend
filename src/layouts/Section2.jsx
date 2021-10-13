import React, { useState, useEffect, useMemo, forwardRef } from "react"
import withStyles from "react-jss"
import { useCombobox } from "downshift"
import { Chart, Table } from "../components"
import { S2_TABLE_HEADINGS } from "../data/filters"
import { trendsDistribution } from "../data/trends-distribution"
import { stringCompare, formatData, formatChartData } from "../utils/helper"
import colors from "../data/colors"
import { borderRadius } from "../data/globalStyles"

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
    alignItems: "center",
    width: "100%",
    marginBottom: "1rem",
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
  tableFilters: {
    display: "flex",
    flexDirection: "column",
  },
  tableOrViz: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "column",
    width: "100%",
  },
  dataTable: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
  },
  select: {
    position: "relative",
    display: "flex",
    width: "100%",
  },
  selectLabel: {
    fontSize: "calc(10px + (16 - 10) * ((100vw - 300px) / (1600 - 300)))",
    marginBottom: "0.5rem",
  },
  textSearch: {
    width: "400px",
    padding: "0.5rem 1rem",
    borderRadius: borderRadius,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    color: colors.black,
    // reset styles
    boxSizing: "content-box",
    margin: 0,
    // border: `1px solid ${colors.lightGrey}`,
    border: `1px solid ${colors.lightGrey}`,
    borderRight: 0,
    fontSize: "calc(12px + (18 - 12) * ((100vw - 300px) / (1600 - 300)))",
  },
  showDropdown: {
    fontSize: "calc(12px + (18 - 12) * ((100vw - 300px) / (1600 - 300)))",
    padding: "0.5rem 1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    textAlign: "center",
    boxSizing: "border-box",
    border: `1px solid ${colors.lightGrey}`,
    borderRadius: borderRadius,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    margin: 0,
    background: colors.lightGrey,
    color: colors.black,
    transition: "background 0.2s ease-in-out, color 0.3s ease-in-out",
    // "&:hover": {
    //   background: colors.purple,
    //   color: colors.white,
    // },
  },
  optionsContainer: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    position: "absolute",
    top: "40px",
    zIndex: "100",
    background: colors.white,
    maxHeight: "250px",
    maxWidth: "400px",
    border: `1px solid ${colors.purple}`,
    borderRadius: borderRadius,
    overflowY: "scroll",
    cursor: "default",
  },
  option: {
    padding: "0.7rem 1rem",
    borderRadius: borderRadius,
  },
  fullWidth: { width: "100%", display: "flex" },
  vizContainer: {
    width: "100%",
    minHeight: "70vh",
  },
}

const Section2 = ({ classes }, ref) => {
  const [mode, setMode] = useState("viz") // viz || table

  const INITIAL_DATA = useMemo(() => formatData(trendsDistribution, 2), [])

  const TOPICS = useMemo(
    () => [...new Set(INITIAL_DATA.map((d) => d.admantx))],
    [INITIAL_DATA]
  )

  const [dropdown, setDropdown] = useState(() => TOPICS)

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    selectedItem,
    getItemProps,
  } = useCombobox({
    items: TOPICS,
    defaultSelectedItem: TOPICS.filter((d) =>
      d.includes("style and fashion")
    )[0],
    onInputValueChange: ({ inputValue }) => {
      setDropdown(
        TOPICS.filter((item) =>
          item.toLowerCase().includes(inputValue.toLowerCase())
        )
      )
    },
  })

  const activeFilter = useMemo(() => selectedItem, [selectedItem])

  const [data, setData] = useState(INITIAL_DATA)
  const [chartData, setChartData] = useState()

  useEffect(() => {
    if (activeFilter)
      setData(
        INITIAL_DATA.filter((d) => stringCompare(d.admantx, activeFilter))
      )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilter])

  useEffect(() => {
    if (data.length) {
      const vizData = formatChartData(data)
      setChartData(vizData)
    }
  }, [data])

  return (
    <div className={classes.container} ref={ref}>
      <div className={classes.wrapper}>
        <h1 className={classes.sectionTitle}>
          Percentage of Pageviews & Tweets by Brand, Month, & Topic
        </h1>
        <p className={classes.description}>
          The table below details the percentage of Condé Nast article pageviews
          and tweets on Twitter by topic, brand (Allure, Glamour, Vogue,
          Twitter), and month. You can use the filter to select specific topics,
          such as{" "}
          <b>
            <em>style and fashion::street style</em>
          </b>
          .
        </p>
        <p className={classes.description}>
          The visualization illustrates the percentage of pageviews/tweets over
          time by brand, month, and topic, which can be chosen via the topic
          dropdown menu.
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
        <div className={classes.tableOrViz}>
          <div className={classes.tableFilters}>
            <label className={classes.selectLabel} {...getLabelProps()}>
              Choose a topic
            </label>
            <div className={classes.select}>
              <div {...getComboboxProps()} className={classes.fullWidth}>
                <input className={classes.textSearch} {...getInputProps()} />
                <button
                  className={classes.showDropdown}
                  type="button"
                  {...getToggleButtonProps()}
                  style={
                    isOpen
                      ? {
                          backgroundColor: colors.purple,
                          color: colors.white,
                        }
                      : {}
                  }
                  aria-label="toggle searchable dropdown">
                  &#8595;
                </button>
              </div>
              <div className={classes.optionsContainer} {...getMenuProps()}>
                {isOpen &&
                  dropdown.map((item, index) => (
                    <div
                      className={classes.option}
                      style={
                        highlightedIndex === index
                          ? { backgroundColor: colors.highlightBlue }
                          : {}
                      }
                      key={`${item}${index}`}
                      {...getItemProps({ item, index })}>
                      {item}
                    </div>
                  ))}
              </div>
            </div>
          </div>
          {mode === "table" ? (
            <>
              <div className={classes.dataTable}>
                <Table columns={S2_TABLE_HEADINGS} data={data} section={2} />
              </div>
            </>
          ) : (
            <div className={classes.vizContainer}>
              <Chart data={chartData} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default withStyles(styles)(forwardRef(Section2))
