import type { Language, Translation } from './i18n'

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: { translation: Translation }
    // if you see an error like: "Argument of type 'DefaultTFuncReturn' is not assignable to parameter of type xyz"
    // set returnNull to false (and also in the i18next init options)
    // returnNull: false;
  }
}
