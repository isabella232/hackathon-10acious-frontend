import React from "react"
import withStyles from "react-jss"

const styles = {
  container: {
    display: "flex",
    marginTop: "2rem",
    width: "100%",
  },
  table: {
    display: "flex",
    flexFlow: "column nowrap",
    lineHeight: "1.5",
    flex: "1 1 auto",
    overflow: "auto",
  },
  th: {
    display: "flex",
    flexFlow: "row nowrap",
    position: "sticky",
    color: "#A09F9F",
    // font-size: 14px;
    // textTransform: "uppercase",
    overflowWrap: "break-word",
    marginBottom: "1.5rem",
    top: 0,
    zIndex: 10,
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
  },
  thtd: {
    composes: "$td",
    borderBottom: "3px solid #A09F9F",
    background: "white",
    justifyContent: "center",
    cursor: "pointer",
    "&:hover": {
      fontWeight: 600,
      cursor: "pointer",
    },
  },
  body: {
    display: "inline-block",
    minWidth: "100%",
    position: "relative",
    /* Row height + Margin (60 + 12)px * Number of rows to be displayed */
    height: "70vh",
    // height: "100%",
  },
  row: {
    display: "flex",
    flexFlow: "row nowrap",
    marginBottom: "1rem",
    border: "1px solid black",
  },
}

const Table = ({ classes, columns, data }) => {
  return (
    <div className={classes.container}>
      <div className={classes.table}>
        <div className={classes.th}>
          {columns.map((name, i) => (
            <div key={i} className={classes.thtd}>
              {name}
            </div>
          ))}
        </div>
        <div className={classes.body}>
          {data.map((d) => (
            <div className={classes.row} key={d.id}>
              <div className={classes.td}>{d.admantx}</div>
              <div className={classes.td}>{d.percentageOfArticles}</div>
              <div className={classes.td}>{d.brand}</div>
              <div className={classes.td}>{d.month}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default withStyles(styles)(Table)
