<template>
  <div>
    <textarea :id="_id" class="editor" :v-model="value"></textarea>
  </div>
</template>

<script>
import tinymce from 'tinymce'
import './zh_CN.js'
import 'tinymce/themes/silver/theme/'
import 'tinymce/skins/ui/oxide/skin.min.css'
import 'tinymce/plugins/image'
import 'tinymce/plugins/lists'
export default {
  name: 'Reditor',
  props: {
    height: {
      type: Number,
      default: 300
    },
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      flag: true,
      tinymceHeight: 300
    }
  },
  watch: {
    height: {
      immediate: true,
      handler(val) {
        this.tinymceHeight = val
      }
    },
    value(val) {
      if (this.flag === false) return
      tinymce.activeEditor.setContent(val)
      this.flag = true
    }
  },
  mounted() {
    const me = this
    this.$nextTick(() => {
      tinymce.init({
        selector: '#' + this._id,
        language: 'zh_CN',
        plugins: 'image lists',
        menubar: false,
        statusbar: false,
        branding: false,
        brower_spellcheck: false,
        fontsize_formats: '12px 14px 16px 18px 24px 36px 48px',
        toolbar:
          'undo redo | bold italic strikethrough underline | forecolor backcolor | fontsizeselect | alignleft aligncenter alignright | numlist bullist | image',
        height: this.tinymceHeight,
        images_upload_handler: (blobInfo, success, failure) => {
          let formData = new FormData()
          formData.append('file', blobInfo.blob(), blobInfo.filename())
          me.upload(formData, success, failure)
        },
        setup: editor => {
          // editor.on('init', () => {
          //   editor.setContent(this.value)
          // })
          editor.on('input change undo redo execCommand KeyUp', () => {
            me.flag = false
            me.$emit('input', editor.getContent())
          })
        }
      })
    })
  },
  methods: {
    init() {},
    async upload(formData, success, failure) {
      // let { data, err } = await api.upload('/common/v/upload', formData)
      // if (err && err.code !== 401) {
      //   failure(err.msg)
      // } else {
      //   success(data)
      // }
    }
  },
  computed: {
    _id() {
      return 'editor_' + new Date().getTime()
    }
  }
}
</script>