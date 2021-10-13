const slug = (str) => {
  str = str.replace(/^\s+|\s+$/g, "") // trim
  str = str.toLowerCase()

  // remove accents, swap ñ for n, etc
  const from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;"
  const to = "aaaaaeeeeeiiiiooooouuuunc------"
  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i))
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-") // collapse dashes

  return str
}

export const stringCompare = (str1, str2) => {
  return slug(str1) === slug(str2)
}

export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)
export const formatPercent = (num) => `${(num * 100).toFixed(2)}%`

export const formatData = (rawData, section, dataType) => {
  if (section === 1) {
    if (dataType === "conde") {
      return rawData.map((d, i) => ({
        id: i,
        admantx: d.admantx,
        // admantx: d.admantx.split("::"),
        percent: formatPercent(d.percentageOfArticles),
        brand: capitalize(d.brand),
        month: d.month,
      }))
    } else if (dataType === "twitter") {
      return rawData.map((d, i) => ({
        id: i,
        admantx: d.admantx,
        // admantx: d.admantx.split("::"),
        percent: formatPercent(d.percentageOfTweets),
        month: d.month,
      }))
    }
  } else if (section === 2) {
    if (dataType === "conde") {
      return rawData.map((d, i) => ({
        id: i,
        admantx: d.admantx,
        // admantx: d.admantx.split("::"),
        percent: formatPercent(d.percentageOfPageviews),
        brand: capitalize(d.brand),
        month: d.month,
      }))
    } else if (dataType === "twitter") {
      return rawData.map((d, i) => ({
        id: i,
        admantx: d.admantx,
        // admantx: d.admantx.split("::"),
        percent: formatPercent(d.percentageOfTweets),
        brand: capitalize(d.brand),
        month: d.month,
        monthId: d.monthId,
      }))
    } else {
      return rawData.map((d, i) => ({
        id: i,
        admantx: d.admantx,
        // admantx: d.admantx.split("::"),
        percent: formatPercent(d.percentage_of_pageviews),
        brand: capitalize(d.brand),
        month: d.month,
        monthId: d.monthId,
      }))
    }
  }
}
