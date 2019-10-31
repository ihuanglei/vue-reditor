import Editor from './view'

export default {
  install: function(vue, options) {
    vue.component('Editor', Editor)
  }
}
