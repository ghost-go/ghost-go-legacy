import {zhcnMessages} from '../lang/zh-cn.js'
import {zhtwMessages} from '../lang/zh-tw.js'
import {jaMessages} from '../lang/ja.js'
import {koMessages} from '../lang/ko.js'

function lang() {
  //let defaultMessages = zhcnMessages;
  let defaultMessages = null
  let lang = {
    'ghost-go': {locale: 'en', messages: defaultMessages},
    www: {locale: 'en', messages: defaultMessages},
    jp: {locale: 'ja', messages: jaMessages},
    tw: {locale: 'zh-tw', messages: zhtwMessages},
    cn: {locale: 'zh', messages: zhcnMessages},
    ko: {locale: 'ko', messages: koMessages},
  }
  let domain = window.location.hostname
  let result = eval(`lang.${domain.split('.')[0]}`)
  if (result == null) {
    return {locale: 'en', messages: defaultMessages}
  }
  else {
    return result
  }
}

export default lang()
