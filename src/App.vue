<template>
  <div id="app">
    <p>{{ date }}</p>
    <date-picker
      :disabled='disabled'
      lang='en'
      @change='changeDate'
      :highlighted='highlighted'>
    </date-picker>
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <div>
    </div>
    <div>
      <h1>Yep, I made it!</h1>
      <p>Lorem nam nesciunt quia recusandae soluta. Repudiandae architecto ab perspiciatis distinctio rem? Modi commodi omnis tempora eaque velit. Quaerat similique alias adipisci culpa itaque. Aliquid voluptatem sed aliquid facilis iste!</p>
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
      this.date = d.toLocaleTimeString()
    }
  },
  data () {
    return {
      date: '2018-01-02',
      msg: 'Welcome to Your Vue.js App',
      disabled: {
        from: '2038-03-04',
        to: '1016-12-09',
        dates: ['2017-11-08', '2017-11-19', '2017-11-29', '2017-12-03']
      },
      highlighted: {
        froms: '2016-10-05',
        tos: '2016-12-24',
        dates: ['2016-02-31', '2016-02-19', '2017-12-29', '2017-12-13']
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
