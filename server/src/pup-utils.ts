import * as fs from 'fs'
import { Browser, Page } from 'puppeteer'
import { pupCache } from './pup'

export const closePup = async (pupId: string, browser: Browser) => {
  await browser.close()
  delete pupCache[pupId]
  try {
    fs.unlink(`captchas/${pupId}.png`, (err) => err)
  } catch (err) {
    console.log(err)
  }
}

export const getOptionValue = async (
  page: Page,
  selectSelector: string,
  optionValue: string
) => {
  const value = await page.evaluate(
    (selectSelector, optionValue) => {
      const options = Array.from(
        document.querySelector(selectSelector)!.querySelectorAll('option')
      )
      return options.find((opt) => opt.textContent === optionValue)?.value
    },
    selectSelector,
    optionValue
  )
  if (!value)
    throw `Option ${optionValue} not found for selector ${selectSelector}`
  return value
}

export const getOptionIndex = async (
  page: Page,
  selectSelector: string,
  optionValue: string
) => {
  const optionIndex = await page.evaluate(
    (selectSelector, optionValue) => {
      const options = Array.from(
        document.querySelector(selectSelector)!.querySelectorAll('li')
      )
      const option = options.find((opt) => opt.textContent === optionValue)
      if (!option) return undefined
      return options.indexOf(option) + 1
    },
    selectSelector,
    optionValue
  )
  if (!optionIndex)
    throw `Option ${optionValue} not found for selector ${selectSelector}`
  return optionIndex
}
