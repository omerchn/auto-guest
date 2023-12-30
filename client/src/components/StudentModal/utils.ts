const getEnglishDormName = (hebrewDormName: string) => {
  if (hebrewDormName === 'מעונות איינשטיין') return 'Einstein Dorms'
  if (hebrewDormName === 'מעונות ברושים') return 'Broshim Dorms'
  return hebrewDormName
}

export const getTranslatedDormName =
  (language: string) => (hebrewDormName: string) => {
    if (language === 'en') {
      return getEnglishDormName(hebrewDormName)
    }
    return hebrewDormName
  }
