import { Page } from 'puppeteer'

export const getOptionValue = async (
  page: Page,
  selectSelector: string,
  optionText: string
) => {
  const value = await page.evaluate(
    (selectSelector, optionText) => {
      const options = Array.from(
        document.querySelector(selectSelector)!.querySelectorAll('option')
      )
      return options.find((opt) => opt.textContent === optionText)?.value
    },
    selectSelector,
    optionText
  )
  if (!value)
    throw `Option ${optionText} not found for selector ${selectSelector}`
  return value
}

export const getLiIndex = async (
  page: Page,
  ulSelector: string,
  liText: string
) => {
  const liIndex = await page.evaluate(
    (ulSelector, liText) => {
      const options = Array.from(
        document.querySelector(ulSelector)!.querySelectorAll('li')
      )
      const option = options.find((opt) => opt.textContent === liText)
      if (!option) return undefined
      return options.indexOf(option) + 1
    },
    ulSelector,
    liText
  )
  if (!liIndex) throw `Option ${liText} not found for selector ${ulSelector}`
  return liIndex
}

export const typeInput = async (
  page: Page,
  input: {
    name: string
    value: string
  }
) => {
  const selector = `[name=${input.name}]`
  await page.waitForSelector(selector)
  await page.type(selector, input.value)
}

export const selectInput = async (
  page: Page,
  input: {
    name: string
    value: string
  }
) => {
  const selector = `[name=${input.name}]`
  await page.waitForSelector(selector)
  const option = await getOptionValue(page, selector, input.value)
  await page.select(selector, option)
}
