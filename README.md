# vue-datepicker-m

## Manual
### props
- highlighted
- disabled
- date
- lang, support 'en' - english, 'cn' - chinese, 'jp' - japanese

### events
- change: pass Date object as params

```html
<date-picker lang='en'
  :disabled='disabled'
  :highlighted>
</date-picker>
```

```javascript
import DatePicker from 'vue-datepicker-m'
components: {
  DatePicker
},
data () {
  return {
    disabled: {
      from: '2018-03-03',
      to: '1990-01-01'
    },
    highlighted: {
      from: '2017-10-10',
      to: '2017-10-25',
      date: ['2017-12-11', '2017-12-14', '2017-12-19']
    }
  }
}
```

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
