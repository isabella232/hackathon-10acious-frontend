import React, { useState, useEffect, useMemo } from "react"
import withStyles from "react-jss"
import { useCombobox } from "downshift"
import { Table } from "../components"
import { S2_TABLE_HEADINGS } from "../data/filters"
import { condeTrendsDistribution } from "../data/conde-trends-distribution"
import { stringCompare, formatData } from "../utils/helper"
import colors from "../data/colors"

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
  select: {
    position: "relative",
  },
  textSearch: {
    width: "400px",
  },
  optionsContainer: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    position: "absolute",
    zIndex: "100",
    background: colors.white,
    maxHeight: "200px",
    border: `1px solid ${colors.black}`,
    overflowY: "scroll",
    cursor: "default",
  },
}

const Section2 = ({ classes }) => {
  const [mode, setMode] = useState("table") // viz || table

  const INITIAL_DATA = useMemo(
    () => formatData(condeTrendsDistribution, 2, "conde"),
    []
  )

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
    defaultSelectedItem: TOPICS[0],
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

  useEffect(() => {
    if (activeFilter)
      setData(
        INITIAL_DATA.filter((d) => stringCompare(d.admantx, activeFilter))
      )
  }, [activeFilter])

  return (
    <div className={classes.container}>
      <h1>Section 2</h1>
      <div className={classes.filters}>
        <button onClick={() => setMode("viz")}>Viz</button>
        <button onClick={() => setMode("table")}>Table</button>
      </div>
      <div className={classes.tableOrViz}>
        Explore topicwise
        <div className={classes.filters}>
          <label {...getLabelProps()}>Choose an element:</label>
          <div className={classes.select}>
            <div {...getComboboxProps()}>
              <input className={classes.textSearch} {...getInputProps()} />
              <button
                type="button"
                {...getToggleButtonProps()}
                aria-label="toggle searchable dropdown">
                &#8595;
              </button>
            </div>
            <div className={classes.optionsContainer} {...getMenuProps()}>
              {isOpen &&
                dropdown.map((item, index) => (
                  <div
                    style={
                      highlightedIndex === index
                        ? { backgroundColor: "#bde4ff" }
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
        <div className={classes.dataTable}>
          <Table columns={S2_TABLE_HEADINGS} data={data} />
        </div>
      </div>
    </div>
  )
}

export default withStyles(styles)(Section2)
