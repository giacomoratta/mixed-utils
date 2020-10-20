import * as libUtils from '../date.utils'

describe('date.utils', function () {
  describe('extractDateTimeChunks', function () {
    it('should create an DateStrings object from string', function () {
      const dateObj = libUtils.extractDateTimeChunks('2020-8-3 13:05:37')
      expect(dateObj).toMatchObject({
        timestampMs: 1596452737000,
        day: { d: 3, dd: '03', weekPos: 1, th: '3rd', abbr: 'Mon', name: 'Monday' },
        month: { m: 8, mm: '08', abbr: 'Aug', name: 'August' },
        year: { y: 2020, yyyy: '2020' },
        hours: { h: 13, hh: '13' },
        minutes: { i: 5, ii: '05' },
        seconds: { s: 37, ss: '37' }
      })
    })

    it('should create an DateStrings object from Date', function () {
      const dateObj = libUtils.extractDateTimeChunks(new Date('2020-8-3 13:05:37'))
      expect(dateObj).toMatchObject({
        timestampMs: 1596452737000,
        day: { d: 3, dd: '03', weekPos: 1, th: '3rd', abbr: 'Mon', name: 'Monday' },
        month: { m: 8, mm: '08', abbr: 'Aug', name: 'August' },
        year: { y: 2020, yyyy: '2020' },
        hours: { h: 13, hh: '13' },
        minutes: { i: 5, ii: '05' },
        seconds: { s: 37, ss: '37' }
      })
    })

    it('should create an DateStrings object from timestamp', function () {
      const dateObj = libUtils.extractDateTimeChunks(1596452737000)
      expect(dateObj).toMatchObject({
        timestampMs: 1596452737000,
        day: { d: 3, dd: '03', weekPos: 1, th: '3rd', abbr: 'Mon', name: 'Monday' },
        month: { m: 8, mm: '08', abbr: 'Aug', name: 'August' },
        year: { y: 2020, yyyy: '2020' },
        hours: { h: 13, hh: '13' },
        minutes: { i: 5, ii: '05' },
        seconds: { s: 37, ss: '37' }
      })
    })
  })

  describe('getWeekInterval', function () {
    it('set basic interval from 1 date', function () {
      const weekInterval = libUtils.getWeekInterval('2020-9-30 13:05:37')
      expect(weekInterval.start.getDate()).toEqual(27)
      expect(weekInterval.start.getDay()).toEqual(0)
      expect(weekInterval.start.getMonth()).toEqual(8)
      expect(weekInterval.start.getHours()).toEqual(0)
      expect(weekInterval.start.getMinutes()).toEqual(0)
      expect(weekInterval.end.getDate()).toEqual(3)
      expect(weekInterval.end.getDay()).toEqual(6)
      expect(weekInterval.end.getMonth()).toEqual(9)
      expect(weekInterval.end.getHours()).toEqual(23)
      expect(weekInterval.end.getMinutes()).toEqual(59)
    })

    it('set basic interval from 2 dates', function () {
      const weekInterval = libUtils.getWeekInterval('2020-9-30 13:05:37', '2020-10-9 23:05:37')
      expect(weekInterval.start.getDate()).toEqual(27)
      expect(weekInterval.start.getDay()).toEqual(0)
      expect(weekInterval.start.getMonth()).toEqual(8)
      expect(weekInterval.start.getHours()).toEqual(0)
      expect(weekInterval.start.getMinutes()).toEqual(0)
      expect(weekInterval.end.getDate()).toEqual(10)
      expect(weekInterval.end.getDay()).toEqual(6)
      expect(weekInterval.end.getMonth()).toEqual(9)
      expect(weekInterval.end.getHours()).toEqual(23)
      expect(weekInterval.end.getMinutes()).toEqual(59)
    })
  })
})
