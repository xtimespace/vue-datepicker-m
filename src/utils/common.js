function isLeapYear (year) {
  let ret
  if (!isNaN(year)) {
    if (year >= 0) {
      if ((year % 400 === 0) ||
          (year % 4 === 0 && year % 100 !== 0)) {
        ret = true
      } else {
        ret = false
      }
    } else {
      year = - year
      if ((year % 400 === 1) ||
          (year % 4 === 1 && year % 100 !== 1)) {
        ret = true
      } else {
        ret = false
      }
    }
  } else {
    ret = false
  }
  return ret
}

function isBigMonth (month) {
  let ret
  month += 1

  if (month === 1 || month === 3 || month === 5 ||
      month === 7 || month === 8 || month === 10 ||
      month === 12) {
    ret = true
  } else {
    ret = false
  }

  return ret
}

// month: 0 - 11
function daysOfMonth (year, month) {
  let ret

  if (!isNaN(year) && month >= 0 && month <= 11) {
    if (month === 1) {
      if (isLeapYear(year)) {
        ret = 29
      } else {
        ret = 28
      }
    } else if (isBigMonth(month)) {
      ret = 31
    } else {
      ret = 30
    }
  } else {
    ret = false
  }

  return ret
}
const langPack = {
  cn: {
    'weeks': ['日', '一', '二', '三', '四', '五', '六'],
    'months': ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
    'today': '今'
  },
  en: {
    'weeks': ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    'months': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dev'],
    'today': 'now'
  },
  jp: {
    'weeks': ['日', '月', '火', '水', '木', '金', '土'],
    'months': ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
    'today': '今'
  }
}

export {
  isLeapYear,
  daysOfMonth,
  langPack
}
