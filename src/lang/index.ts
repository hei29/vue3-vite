import { createI18n } from "vue-i18n";
import zh from './zh'
import en from './en'
import jp from './jp'

export const i18n = createI18n({
    fallbackLocale: 'zh', // 预设语言环境
    locale: 'jp',
    allowComposition: true,
    globalInjection: true, // 全局生效$t
    messages: {
        zh,
        en,
        jp
    }
})
