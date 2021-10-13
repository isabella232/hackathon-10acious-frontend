import colors from "./colors"

export const MONTH_LABELS = [
  "All Months",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
]

export const FASHION_BRANDS = ["All Brands", "Allure", "Glamour", "Vogue"]

export const TABLE_HEADINGS_CONDE = [
  "Admantx Labels",
  "Percentage of Articles",
  // "Brand",
  // "Month",
]
export const TABLE_HEADINGS_TWITTER = [
  "Admantx Labels",
  "Percentage of Tweets",
  // "Brand",
  // "Month",
]

// Section 2
export const S2_TABLE_HEADINGS = [
  "Admantx Labels",
  "Percentage of Pageviews / Tweets",
  // "Brand",
  "Category",
  "Month",
]

// Section 3
export const S3_BRANDS = ["Glamour", "Vogue", "Allure", "Twitter"]
export const S3_MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
]

const chartcolors = [
  colors.glamour,
  // "#0466c8",
  colors.vogue,
  // "#f77f00",
  colors.allure,
  // "#2a9d8f"
  colors.twitterBlue,
]
export const CHART_COLOR_MAPPING = {
  Glamour: chartcolors[0],
  Vogue: chartcolors[1],
  Allure: chartcolors[2],
  Twitter: chartcolors[3],
}
