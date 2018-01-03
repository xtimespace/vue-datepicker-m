<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
    <div>
      <date-picker
        :disabled='disabled'
        :highlighted='highlighted'>
      </date-picker>
    </div>
    <div>
      <h1>Yep, I made it!</h1>
      <p>Lorem nam nesciunt quia recusandae soluta. Repudiandae architecto ab perspiciatis distinctio rem? Modi commodi omnis tempora eaque velit. Quaerat similique alias adipisci culpa itaque. Aliquid voluptatem sed aliquid facilis iste!</p>
    </div>
  </div>
</template>

<script>
import DatePicker from '@/components/datepicker'
export default {
  name: 'app',
  components: {
    DatePicker
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      disabled: {
        from: '2016-03-05',
        to: '2016-04-04',
        dates: ['2016-02-31', '2016-02-39', '2017-12-29', '2017-12-13']
      },
      highlighted: {
        from: '2017-12-05',
        to: '2017-11-24',
        dates: ['2016-02-31', '2016-02-39', '2017-12-29', '2017-12-13']
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
