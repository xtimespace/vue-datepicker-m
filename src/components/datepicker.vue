<template>
  <div class='datepicker'>

    <!-- It's YEAR -->
    <header v-show='shown.year'>
      <span class='itm left' @click='prevDecade'>&lt;</span>
      <span class='itm'>
        <span class='itm-year'>{{ decade }}&apos;s</span>
      </span>
      <span class='itm right' @click='nextDecade'>&gt;</span>
    </header>
    <div class="content" v-show='shown.year'>
      <main class="year">
        <span v-for='itm in years' @click='selectYear(itm)'>
          <span class='text' :class='{
            "selected": itm.selected,
            "disabled": itm.disabled,
            "high": itm.high}'>
            {{ itm.name }}
          </span>
        </span>
      </main>
    </div>

    <!-- It's MONTH -->
    <header v-show='shown.month'>
      <span class='itm left' @click='prevYear'>&lt;</span>
      <span class='itm' @click='toggle("year")'>
        <span class='itm-year'>{{ year }}</span>&nbsp;&nbsp;
      </span>
      <span class='itm right' @click='nextYear'>&gt;</span>
    </header>
    <div class="content" v-show='shown.month'>
      <main class="month">
        <span v-for='(itm, index) in months'>
          <span class='text' @click='selectMonth(index)' :class='{
            "selected": itm.selected,
            "disabled": itm.disabled,
            "high": itm.high}'>
            {{ itm.name }}
          </span>
        </span>
      </main>
    </div>

    <!-- It's DAY -->
    <header v-show='shown.day'>
      <span class='itm left' @click='prevMonth'>&lt;</span>
      <span class='itm' @click='toggle("month")'>
        <span class='itm-month'>
          {{ monthStr }}
        </span>
        &nbsp;&nbsp;
        <span class='itm-year'>{{ year }}</span>
      </span>
      <span class='itm right' @click='nextMonth'>&gt;</span>
    </header>
    <div class="content" v-show='shown.day'>
      <div class="title">
        <span v-for='itm in weeks'>{{ itm }}</span>
      </div>
      <main class='day'>
        <span class='day' v-for='itm in beginDay'></span>
        <span class='day' v-for='(itm, index) in days' :key='index'>
          <span :class='{"text": true,
            "today": isToday(index + 1),
            "high": isHigh(index + 1),
            "disabled": itm.disabled,
            "selected": itm.selected}'
            @click='selectDay(index)'>
            {{ isToday(index + 1) ? todayStr : index + 1 }}
          </span>
        </span>
      </main>
    </div>
  </div>
</template>

<script>
import { daysOfMonth, langPack } from '@/utils/common'
import moment from 'moment'
export default {
  props: ['disabled', 'highlighted', 'lang', 'date'],
  data () {
    return {
      shown: {
        year: false,
        month: false,
        day: true
      },
      weeks: [],
      months: [],
      years: [],
      todayStr: '',
      monthStr: '',
      today: null,
      decade: 0,
      year: 0,
      month: 0,
      current: null,
      days: [],
      highDates: {}
    }
  },
  methods: {
    getHighlightedDates () {
      let ret = {}
      const arr = this.highlighted && this.highlighted.dates

      if (arr && arr instanceof Array && arr.length) {
        for (let i = 0; i < arr.length; i++) {
          const year = arr[i].slice(0, 4)
          const month = arr[i].slice(5, 7)
          if (!ret[year]) {
            ret[year] = {}
          }
          if (!ret[year][month]) {
            ret[year][month] = []
          }
          ret[year][month].push(arr[i])
        }
      }
      this.highDates = ret
    },
    toggle (type) {
      for (let k in this.shown) {
        this.shown[k] = false
      }
      this.shown[type] = true
    },
    isSelected (day) {
      const tmp = moment([this.year, this.month, day])
      if (tmp - this.current === 0) {
        return true
      } else {
        return false
      }
    },
    selectYear (year) {
      this.year = year.name
      this.toggle('month')
    },
    selectMonth (index) {
      this.month = index
      this.toggle('day')
    },
    selectDay (index) {
      if (this.isHigh(index + 1)) {
        this.days[this.current.date() - 1].selected = false
        this.current = moment([this.year, this.month, index + 1])
        this.days[index].selected = true
        this.$emit('change', this.current._d)
      }
    },
    prevMonth () {
      if (this.prevAble) {
        const mt = moment([this.year, this.month, 1]).subtract(1, 'months')
        this.month = mt.month()
        this.year = mt.year()
      }
    },
    nextMonth () {
      if (this.nextAble) {
        const mt = moment([this.year, this.month, 1]).add(1, 'months')
        this.month = mt.month()
        this.year = mt.year()
      }
    },
    prevYear () {
      if (this.prevYearAble) {
        const mt = moment([this.year, 0]).subtract(1, 'years')
        this.year = mt.year()
      }
    },
    nextYear () {
      if (this.nextYearAble) {
        const mt = moment([this.year, 0]).add(1, 'years')
        this.year = mt.year()
      }
    },
    prevDecade () {
      if (this.prevDecadeAble) {
        this.decade -= 10
      }
    },
    nextDecade () {
      if (this.nextDecadeAble) {
        this.decade += 10
      }
    },
    isToday (day) {
      let ret
      if (this.today && day === this.today.getDate() &&
        this.year === this.today.getFullYear() &&
        this.month === this.today.getMonth()) {
        ret = true
      } else {
        ret = false
      }

      return ret
    },
    isYearHigh (year) {
      let ret = false
      let { from, to } = this.fromto.highlighted
      if (from && to) {
        from = moment([from.year()])
        to = moment([to.year(), 11])
        const now = moment([year])
        if (from - to <= 0) {
          if (now - from >= 0 && now - to <= 0) {
            ret = true
          }
        } else {
          if (now - from >= 0 && now - to <= 0) {
            ret = true
          }
        }
      }
      if (!ret) {
        const arr = this.highDates
        if (arr) {
          for (let k in arr) {
            if (Number(k) === year) {
              ret = true
              break
            }
          }
        }
      }
      return ret
    },
    isMonthHigh (index) {
      let ret = false
      let { from, to } = this.fromto.highlighted
      if (from && to) {
        from = moment([from.year(), from.month()])
        to = moment([to.year(), to.month()])
        const now = moment([this.year, index])
        if (from - to <= 0) {
          if (now - from >= 0 && now - to <= 0) {
            ret = true
          }
        } else {
          if (now - from >= 0 && now - to <= 0) {
            ret = true
          }
        }
      }
      if (!ret) {
        const arr = this.highDates && this.highDates[this.year]
        if (arr) {
          for (let k in arr) {
            if (Number(k) === index + 1) {
              ret = true
              break
            }
          }
        }
      }
      return ret
    },
    isHigh (day) {
      return this.isChosen(day, 'highlighted')
    },
    isDisabled (day) {
      return this.isChosen(day, 'disabled')
    },
    isChosen (day, type) {
      let ret = false
      const now = moment([this.year, this.month, day])

      if (this[type]) {
        const chosen = this[type]
        if (chosen.from && chosen.to) {
          const from = moment(chosen.from)
          const to = moment(chosen.to)
          if (from - to >= 0) {
            if (now - from >= 0 || now - to <= 0) ret = true
          } else {
            if (now - from >= 0 && now - to <= 0) ret = true
          }
        }
        if (!ret && chosen.dates) {
          for (let i = 0; i < chosen.dates.length; i++) {
            if (moment(chosen.dates[i]) - now === 0) {
              ret = true
              break
            }
          }
        }
      }

      return ret
    },
    refreshDays () {
      const days = new Array(daysOfMonth(this.year, this.month))

      for (let i = 0; i < days.length; i++) {
        days[i] = {}
        if (!this.isHigh(i + 1)) {
          days[i].disabled = true
        } else {
          days[i].disabled = false
        }
        if (this.isSelected(i + 1)) {
          days[i].selected = true
        } else {
          days[i].selected = false
        }
      }
      this.days = days
    },
    refreshMonths () {
      const ms = this.months
      for (let i = 0; i < ms.length; i++) {
        if (this.isMonthHigh(i)) {
          ms[i].high = true
        } else {
          ms[i].high = false
        }
      }
    },
    refreshYears () {
      const year = this.decade
      for (let i = 0; i < this.years.length; i++) {
        const itm = this.years[i]
        itm.name = year + i
        if (this.isYearHigh(year + i)) {
          itm.high = true
        } else {
          itm.high = false
        }
      }
    }
  },
  watch: {
    year () {
      this.refreshMonths()
      this.refreshDays()
    },
    month () {
      this.refreshDays()
      this.monthStr = this.months[this.month].name
    },
    decade () {
      this.refreshYears()
    },
    highlighted () {
      this.getHighlightedDates()
    }
  },
  computed: {
    fromto () {
      let ret = {
        disabled: { from: null, to: null },
        highlighted: { from: null, to: null }
      }
      const obj = this.disabled
      if (obj) {
        if (obj.from) {
          ret.disabled.from = moment(obj.from)
        }
        if (obj.to) {
          ret.disabled.to = moment(obj.to)
        }
        if (!obj.from && obj.to) {
          obj.from = moment([0])
        } else if (obj.from && !obj.to) {
          obj.to = moment([3000])
        }
      }

      const hobj = this.highlighted
      if (hobj) {
        if (hobj.from) {
          ret.highlighted.from = moment(hobj.from)
        }
        if (hobj.to) {
          ret.highlighted.to = moment(hobj.to)
        }
        if (!hobj.from && hobj.to) {
          hobj.from = moment([0])
        } else if (obj.from && !obj.to) {
          hobj.to = moment([3000])
        }
      }

      return ret
    },
    beginDay () {
      let ret = 0
      if (this.year) {
        ret = moment([this.year, this.month]).day()
      }
      return ret
    },
    language () {
      return this.lang ? this.lang : 'cn'
    },
    prevDecadeAble () {
      let ret = true
      let { from, to } = this.fromto.disabled

      if (from && to) {
        const now = moment([this.decade, 0])
        if (to - from < 0) {
          if (now - to <= 0) {
            ret = false
          }
        }
      }

      return ret
    },
    nextDecadeAble () {
      let ret = true
      const { from, to } = this.fromto.disabled

      if (from && to) {
        const now = moment([this.decade, 11])
        if (to - from < 0) {
          if (now - from >= 0) {
            ret = false
          }
        }
      }
      return ret
    },
    nextYearAble () {
      let ret = true
      const { from, to } = this.fromto.disabled

      if (from && to) {
        const now = moment([this.year, 11])
        if (to - from < 0) {
          if (now - from >= 0) {
            ret = false
          }
        }
      }
      return ret
    },
    nextAble () {
      let ret = true
      const { from, to } = this.fromto.disabled

      if (from && to) {
        const now = moment([this.year, this.month + 1])
        if (to - from < 0) {
          if (now - from >= 0) {
            ret = false
          }
        }
      }
      return ret
    },
    prevYearAble () {
      let ret = true
      let { from, to } = this.fromto.disabled

      if (from && to) {
        const now = moment([this.year, 0])
        if (to - from < 0) {
          if (now - to <= 0) {
            ret = false
          }
        }
      }

      return ret
    },
    prevAble () {
      let ret = true
      let { from, to } = this.fromto.disabled

      if (from && to) {
        const now = moment([this.year, this.month])
        if (to - from < 0) {
          if (now - to <= 0) {
            ret = false
          }
        }
      }

      return ret
    }
  },
  mounted () {
    this.weeks = langPack[this.language].weeks
    this.todayStr = langPack[this.language].today
    const today = new Date()
    this.today = today
    this.year = today.getFullYear()
    this.month = today.getMonth()
    this.decade = Math.floor(this.year / 10) * 10

    this.getHighlightedDates()

    if (!this.date) {
      this.current = moment([this.year, this.month, today.getDate()])
    } else {
      this.current = moment(this.date)
    }

    this.months = langPack[this.language].months.map(d => {
      return {
        name: d,
        disabled: false,
        selected: false,
        high: false
      }
    })

    this.monthStr = this.months[this.month].name

    for (let i = 0; i < 10; i++) {
      this.years[i] = {
        name: i,
        disabled: false,
        selected: false,
        high: false
      }
    }
  }
}
</script>

<style lang='scss' scoped>
$bgColor: #ffffff;
$shadowColor: #aeaeae;
$hlColor: #ff7d31;
$dtBg: #fcf1eb;

.datepicker {
  color: #2c3e50;
  text-align: center;
  position: absolute;
  right: 0;
  left: 0;
  background: $bgColor;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 3px 1px $shadowColor;
  z-index: 1000;
  margin: 2.2em 4px 0 4px;
}
header {
  display: flex;
  margin-top: 1em;
  justify-content: space-between;
  font-weight: bold;

  .left, .right {
    flex: 0 0 14.2857%;
    cursor: pointer;
    text-align: center;
  }
}
header, .title, main {
  padding: 0 1em;
}
.title, main {
  margin-top: 1em;
  display: flex;
  flex-flow: row wrap;

  span {
    height: 3em;
    line-height: 3em;
  }
}
main.day, .title {
  span {
    flex: 0 0 14.2857%;
  }
}
main.month {
  span {
    flex: 0 0 25%;
  }
}
main.year {
  span {
    flex: 0 0 25%;
  }
}
.title {
  margin-top: 2em;
  background: $dtBg;
  height: 3em;
  vertical-align: middle;
}
main .day, main .month {
  cursor: pointer;
}
main span {
  text-align: center;
}
main .text {
  display: inline-block;
  height: 2.8em;
}
main.day .text {
  width: 2.2em;
  height: 2.2em;
  line-height: 2.2em;
  border-radius: 50%;
}
main.month .text,
main.year .text {
  width: 4em;
  cursor: pointer;
}
.today {
  background: $dtBg;
  border-radius: 50%;
}
.high {
  color: $hlColor;
}
.disabled {
  color: #777;
}
.selected {
  background: $hlColor;
  color: white;
}
.itm-year,
.itm-month {
  cursor: pointer;
}
</style>
