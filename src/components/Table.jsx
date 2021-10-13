import React from "react"
import withStyles from "react-jss"
import colors from "../data/colors"
import useWindowSize from "../hooks/useWindowSize"
import { borderRadius } from "../data/globalStyles"
import { Up, Down } from "../assets/icons"

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    marginTop: "2rem",
    marginBottom: "3rem",
  },
  table: {
    display: "flex",
    flexFlow: "column nowrap",
    lineHeight: "1.5",
    flex: "1 1 auto",
    overflow: "auto",
    borderRadius: borderRadius,
    border: `4px solid ${colors.lightGrey}`,
    borderLeft: 0,
    borderRight: 0,
  },
  th: {
    display: "flex",
    flexFlow: "row nowrap",
    position: "sticky",
    color: "#A09F9F",
    background: colors.tableHeader,
    overflowWrap: "break-word",
    marginBottom: "1.5rem",
    padding: "0 1rem",
    top: 0,
    zIndex: 10,
    "& > :nth-child(2)": {
      justifyContent: "flex-end",
    },
  },
  td: {
    minHeight: "40px",
    padding: "0.5rem",
    display: "flex",
    alignItems: "center",
    flexFlow: "row nowrap",
    flexGrow: 1,
    flexBasis: 0,
    wordBreak: "break-word",
    hyphens: "auto",
    margin: "0 0.2rem",
    fontSize: "calc(10px + (16 - 10) * ((100vw - 300px) / (1600 - 300)))",
  },
  thtd: {
    composes: "$td",
    color: colors.tableHeaderText,
    fontSize: "calc(10px + (16 - 10) * ((100vw - 300px) / (1600 - 300)))",
    cursor: "pointer",
    fontWeight: 600,
  },
  body: {
    display: "inline-block",
    minWidth: "100%",
    position: "relative",
    height: "65vh",
    "& > :nth-child(odd)": {
      background: colors.tableRowBG,
      borderLeft: `3px solid ${colors.purple}`,
    },
  },
  row: {
    borderLeft: `3px solid ${colors.white}`,
    display: "flex",
    flexFlow: "row nowrap",
    marginBottom: "1rem",
    padding: "0 1rem",
    borderRadius: "5px",
    "& > :nth-child(2)": {
      justifyContent: "flex-end",
    },
  },
  icon: {
    width: "20px",
    margin: "0 0 0 5px",
  },
}

const Table = ({ classes, title, columns, data, section }) => {
  const { width } = useWindowSize()
  return (
    <div
      className={classes.container}
      style={{
        width: section === 2 ? "100%" : width <= 650 ? "100%" : "47%",
      }}>
      <h3 className={classes.title}>{title}</h3>
      <div className={classes.table}>
        <div className={classes.th}>
          {columns.map((name, i) => (
            <div key={i} className={classes.thtd}>
              {name}
              <img className={classes.icon} src={Down} alt="Sort the column" />
            </div>
          ))}
        </div>
        <div className={classes.body}>
          {data.map((d) => (
            <div className={classes.row} key={d.id}>
              <div className={classes.td}>{d.admantx}</div>
              <div className={classes.td}>{d.percent}</div>
              {section === 2 ? (
                <>
                  <div className={classes.td}>{d.brand}</div>
                  <div className={classes.td}>{d.month}</div>
                </>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default withStyles(styles)(Table)
