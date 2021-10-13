import React from "react"
import withStyles from "react-jss"

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginTop: "3rem",
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: "1100px",
  },
  description: {
    lineHeight: "1.4",
  },
}

const Intro = ({ classes }) => {
  return (
    <section className={classes.container}>
      <div className={classes.wrapper}>
        <p className={classes.description}>
          Condé Nast is missing out on traffic and revenue because of delays in
          awareness of trending topics. Oftentimes, publishers simply react to
          trending conversations, resulting in slower publishing times &
          preconceived content strategies, as opposed to being ahead of the
          curve and producing more diverse, wider reaching content.
        </p>
      </div>
    </section>
  )
}

export default withStyles(styles)(Intro)
