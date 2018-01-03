<template>
  <div class='datepicker'>
    <header>
      <span class='itm left' @click='prevMonth'>&lt;</span>
      <span class='itm'>
        <span class='itm-month'>{{ months[month] }} {{lang === 'en'? '' : '月'}}</span>&nbsp;&nbsp;
        <span class='itm-year'>{{ year }}</span>
      </span>
      <span class='itm right' @click='nextMonth'>&gt;</span>
    </header>
    <div class="title">
      <span v-for='itm in weeks'>{{ itm }}</span>
    </div>
    <main>
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
</template>

<script>
import { daysOfMonth, langPack } from '@/utils/common'
import moment from 'moment'
export default {
  props: ['disabled', 'highlighted', 'lang', 'date'],
  data () {
    return {
      weeks: [],
      months: [],
      todayStr: '',
      today: null,
      year: 0,
      month: 0,
      current: null,
      days: []
    }
  },
  methods: {
    isSelected (day) {
      const tmp = moment([this.year, this.month, day])
      if (tmp - this.current === 0) {
        return true
      } else {
        return false
      }
    },
    selectDay (index) {
      if (this.isHigh(index + 1)) {
        this.days[this.current.date() - 1].selected = false
        this.current = moment([this.year, this.month, index + 1])
        this.days[index].selected = true
        this.$emit('change', this.current.format('YYYY-MM-DD'))
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
    }
  },
  watch: {
    year () {
      this.refreshDays()
    },
    month () {
      this.refreshDays()
    }
  },
  computed: {
    beginDay () {
      if (this.year && this.month) {
        return new Date(this.year, this.month, 1).getDay()
      }
    },
    language () {
      return this.lang ? this.lang : 'cn'
    },
    nextAble () {
      let ret = true

      const obj = this.disabled
      if (obj.from && obj.to) {
        const from = moment(obj.from)
        const to = moment(obj.to)
        const now = moment([this.year, this.month + 1])

        if (to - from < 0) {
          if (now - from >= 0) {
            ret = false
          }
        }
      }

      return ret
    },
    prevAble () {
      let ret = true

      const obj = this.disabled
      if (obj.from && obj.to) {
        const from = moment(obj.from)
        const to = moment(obj.to)
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
    this.months = langPack[this.language].months
    this.todayStr = langPack[this.language].today
    const today = new Date()
    this.today = today
    this.year = today.getFullYear()
    this.month = today.getMonth()

    if (!this.date) {
      this.current = moment([this.year, this.month, today.getDate()])
    } else {
      this.current = moment(this.date)
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
  background: $bgColor;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 3px 1px $shadowColor;
}
header {
  display: flex;
  margin-top: 1em;
  justify-content: space-between;
  font-weight: bold;

  .left, .right {
    flex: 0 0 14.2857%;
    cursor: pointer;
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
    flex: 0 0 14.2857%;
    height: 3em;
    line-height: 3em;
  }
}
.title {
  margin-top: 2em;
  background: $dtBg;
  height: 3em;
  vertical-align: middle;
}
main .day {
  cursor: pointer;
}
main .text {
  display: inline-block;
  width: 2.8em;
  height: 2.8em;
  line-height: 2.8em;
  border-radius: 50%;
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
</style>
