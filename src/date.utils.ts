const DAYS_LIST = [
  { abbreviation: 'Sun', name: 'Sunday' },
  { abbreviation: 'Mon', name: 'Monday' },
  { abbreviation: 'Tue', name: 'Tuesday' },
  { abbreviation: 'Wed', name: 'Wednesday' },
  { abbreviation: 'Thu', name: 'Thursday' },
  { abbreviation: 'Fri', name: 'Friday' },
  { abbreviation: 'Sat', name: 'Saturday' }
]

const MONTHS_LIST = [
  { abbreviation: 'Jan', name: 'January' },
  { abbreviation: 'Feb', name: 'February' },
  { abbreviation: 'Mar', name: 'March' },
  { abbreviation: 'Apr', name: 'April' },
  { abbreviation: 'May', name: 'May' },
  { abbreviation: 'Jun', name: 'June' },
  { abbreviation: 'Jul', name: 'July' },
  { abbreviation: 'Aug', name: 'August' },
  { abbreviation: 'Sep', name: 'September' },
  { abbreviation: 'Oct', name: 'October' },
  { abbreviation: 'Nov', name: 'November' },
  { abbreviation: 'Dec', name: 'December' }
]

interface DateTimeChunks {
  timestampMs: number
  day: { d: number, dd: string, th: string, weekPos: number, abbr: string, name: string }
  month: { m: number, mm: string, abbr: string, name: string }
  year: { y: number, yyyy: string }
  hours: { h: number, hh: string }
  minutes: { i: number, ii: string }
  seconds: { s: number, ss: string }
}

/**
 * Basic class for handling string pieces of a date.
 * @param date string|number|Date
 * @return DateTimeChunks
 */
export const extractDateTimeChunks = (date: string|number|Date): DateTimeChunks => {
  const d = date instanceof Date ? date : new Date(date)
  const chunks: DateTimeChunks = {
    timestampMs: d.getTime(),
    day: {
      d: d.getDate(),
      dd: d.getDate().toString().padStart(2, '0'),
      th: ((day: number = d.getDate()): string => {
        if (day === 1) return '1st'
        if (day === 2) return '2nd'
        if (day === 3) return '3rd'
        return day.toString() + 'th'
      })(),
      weekPos: d.getDay(),
      abbr: DAYS_LIST[d.getDay()].abbreviation,
      name: DAYS_LIST[d.getDay()].name
    },
    month: {
      m: (d.getMonth() + 1),
      mm: (d.getMonth() + 1).toString().padStart(2, '0'),
      abbr: MONTHS_LIST[d.getMonth()].abbreviation,
      name: MONTHS_LIST[d.getMonth()].name
    },
    year: {
      y: d.getFullYear(),
      yyyy: d.getFullYear().toString()
    },
    hours: {
      h: d.getHours(),
      hh: d.getHours().toString().padStart(2, '0')
    },
    minutes: {
      i: d.getMinutes(),
      ii: d.getMinutes().toString().padStart(2, '0')
    },
    seconds: {
      s: d.getSeconds(),
      ss: d.getSeconds().toString().padStart(2, '0')
    }
  }
  return chunks
}

/**
 * Return the first and the end day of the week for the given parameters.
 * @param startDate string|number|Date
 * @param endDate? string|number|Date
 * @return { start: Date, end: Date }
 */
export const getWeekInterval = (
  startDate: string|number|Date,
  endDate?: string|number|Date
): { start: Date, end: Date } => {
  const tempDate1 = startDate instanceof Date ? startDate : new Date(startDate)
  const tempDate2 = (endDate === undefined ? null : endDate instanceof Date ? endDate : new Date(endDate))

  const date1 = new Date(tempDate1.getTime() - 1000 * 60 * 60 * 24 * tempDate1.getDay()) // set to sunday
  date1.setHours(0, 0, 0, 0)

  let date2
  if (tempDate2 !== null) {
    date2 = new Date(tempDate2.getTime() + 1000 * 60 * 60 * 24 * (6 - tempDate2.getDay())) // set to saturday
  } else {
    date2 = new Date(tempDate1.getTime() + 1000 * 60 * 60 * 24 * (6 - tempDate1.getDay())) // set to saturday
  }
  date2.setHours(23, 59, 59, 999)

  return { start: date1, end: date2 }
}
