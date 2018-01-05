<template>
  <div id="app">
    <p @click='showView=!showView'>{{ date }}</p>
    <date-picker
      :disabled='disabled'
      lang='en'
      :date='date'
      :showView=showView
      @close='close'
      @change='changeDate'
      :highlighted='highlighted'>
    </date-picker>
    <!-- <date-picker lang='jp' @change='changeDate'></date-picker> -->
    <h1>{{ msg }}</h1>
    <div>
    </div>
    <div>
      <h1>Wonderful Vue2 datepicker</h1>
      <h3>No input at all, just enjoy it!</h3>
      <p>Thank you!</p>
    </div>
  </div>
</template>

<script>
import DatePicker from '@/components/datepicker'
// import DatePicker from '../dist/index.js'
export default {
  name: 'app',
  components: {
    DatePicker
  },
  methods: {
    changeDate (d) {
      this.date = this.formattedDate(d)
    },
    close () {
      this.showView = false
    },
    formattedDate (d) {
      const year = d.getFullYear()
      const month = d.getMonth() + 1
      const day = d.getDate()
      const ret = year + '-' + (month > 9 ? month : `0${month}`) + '-' + (day > 9 ? day : `0${day}`)
      return ret
    }
  },
  data () {
    return {
      date: '2017-11-03',
      showView: false,
      msg: 'Welcome to The Vue2 datepicker, which works fine on mobile phones! ',
      disabled: {
        from: '2038-03-04',
        to: '1016-12-09',
        dates: ['2017-11-08', '2017-11-19', '2017-11-29', '2017-12-03']
      },
      highlighted: {
        // from: '2016-10-05',
        // to: '2016-12-24',
        from: null,
        to: null,
        dates: ['2017-12-03', '2017-11-04', '2017-12-12', '2017-12-13', '2018-01-02']
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
